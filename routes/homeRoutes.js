const router = require("express").Router();
const { request } = require("express");
const { Worker, User, Tag } = require("../models");
const withAuth = require("../utils/auth");

// // ? check why she get first tags
router.get("/", async (req, res) => {
  console.log("Rendering the homepage", req.session.logged_in);
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

router.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const userData = {
    ...req.body,
    birth_date: req.body.birthDate,
  };
  console.log(userData);
  try {
    const users = await User.create(userData);
    res.render("login");
  } catch (error) {
    console.log(error);
    res.render("login");
  }
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
