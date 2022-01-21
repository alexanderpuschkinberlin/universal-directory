const router = require("express").Router();
const { User, Worker, Contact } = require("../../models");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async (req, res) => {
  try {
    const userData = await Worker.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/profile/:id", async (req, res) => {
  const worker = {
    ...req.body,
    Contact: {
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
      zip_code: req.body.zip_code,
    },
  };
  console.log(req.session);
  if (!req.files) {
    console.log("No files uploaded");
  } else {
    const file = req.files.upload_image;
    worker.image_url = "/images/upload_images/" + req.session.id + file.name;
    file.mv(
      "public/images/upload_images/" + req.session.id + file.name,
      function (err) {
        if (err) {
          console.log("Error while moving the file");
        } else {
          console.log("File uploaded successfully");
        }
      }
    );
  }

  console.log(worker);
  try {
    //Update worker profile and contact
    await Worker.update(worker, {
      where: {
        id: worker.id,
      },
    });
    // Update contact separately
    await Contact.update(worker.Contact, {
      where: {
        worker_id: worker.id,
      },
    });
    res.status(200).json({ worker });
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new Worker
router.post("/signup", async (req, res) => {
  const userData = {
    ...req.body,
  };
  console.log(req.files);
  if (!req.files) {
    console.log("No files uploaded");
  } else {
    const randomId = uuidv4();
    const file = req.files.upload_image;

    userData.image_url = "/images/upload_images/" + randomId + file.name;
    file.mv(
      "public/images/upload_images/" + randomId + file.name,
      function (err) {
        if (err) {
          console.log("Error while moving the file");
        } else {
          console.log("File uploaded successfully");
        }
      }
    );
  }

  try {
    const newUserData = await Worker.create(userData);

    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.username = newUserData.username;
      req.session.logged_in = true;

      res.status(200).json(newUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
