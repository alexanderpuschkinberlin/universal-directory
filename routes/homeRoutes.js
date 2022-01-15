const router = require("express").Router();
const { Worker, User, Tag, Contact, Expertise } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const tagsData = await Tag.findAll();

    // Serialize data so the template can read it
    const tags = tagsData.map((tag) => tag.get({ plain: true }));
    // Pass serialized data and session flag into template

    res.render("homepage", {
      tags,
      //   logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const workerData = await Worker.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Contact,
          attributes: ["address", "city", "country", "contact_number"],
        },
      ],
    });
    const worker = workerData.get({ plain: true });
    console.log("Hello worker", worker);

    res.render("profile", { worker });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
