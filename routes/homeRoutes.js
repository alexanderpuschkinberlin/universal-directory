const router = require("express").Router();
const { request } = require("express");
// const { Model } = require("sequelize/types");
const { Worker, User, Tag, Contact, Order } = require("../models");
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
// Rendering workers per tag search

router.get("/tagsearch/:id", async (req, res) => {
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
    res.render("tagsearch", {
      tags,
      //   logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendering profile of the worker
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
    res.render("profile", { worker });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendering login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Rendering about us page
router.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

// Rendering sign up page

router.get("/signup", (req, res) => {
  res.render("signup");
});

// Post sign up api

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

// Rendering contact us page
router.get("/contact", (req, res) => {
  res.render("contact");
});
// Rendering order page
router.get("/order", (req, res) => {
  res.render("order");
});

// Rendering Order Routes
router.get("/placedOrder", async (req, res) => {
  console.log("Rendering orders page", req.session.logged_in);
  try {
    const orderData = await Order.findAll({
      where: {
        worker_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const orders = orderData.map((order) => order.get({ plain: true }));
    // Pass serialized data and session flag into template

    res.render("placedOrder", {
      orders,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
