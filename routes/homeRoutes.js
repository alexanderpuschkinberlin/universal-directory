const router = require("express").Router();
const { Worker, User, Tag } = require("../models");
const withAuth = require("../utils/auth");

// // ? check why she get first tags
router.get("/", async (req, res) => {
  try {
    const tagsData = await Tag.findAll();

    // Serialize data so the template can read it
    const tags = tagsData.map((tag) => tag.get({ plain: true }));
    // Pass serialized data and session flag into template

    res.render("homepage", {
      tags,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// router.get("/", withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ["password"] },
//       order: [["name", "ASC"]],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render("homepage", {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
