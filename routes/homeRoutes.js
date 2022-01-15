const router = require("express").Router();
// const { Model } = require("sequelize/types");
const { Worker, User, Tag } = require("../models");
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
// Rendering workers per tag search

router.get("/tagsearch/:id", async (req, res) => {
  console.log("Check data!!!!");
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Worker,
        },
      ],
    });

    // Serialize data so the template can read it
    const tags = tagData.get({ plain: true });
    // Pass serialized data and session flag into template
    console.log("Check data!!!!", tags);
    res.render("tagsearch", {
      tags,
      //   logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Working copy for rendering all workers

// router.get("/tagsearch", async (req, res) => {
//   try {
//     const workerData = await Worker.findAll({});

//     // Serialize data so the template can read it
//     const workers = workerData.map((worker) => worker.get({ plain: true }));
//     // Pass serialized data and session flag into template

//     res.render("tagsearch", {
//       workers,
//       //   logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
