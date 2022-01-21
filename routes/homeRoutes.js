const router = require("express").Router();
const { request } = require("express");
const { v4: uuidv4 } = require("uuid");
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
      user_id: req.session.user_id,
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
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

// Rendering profile of the worker
router.get("/profile/:id", async (req, res) => {
  try {
    const workerData = await Worker.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Contact,
          attributes: [
            "address",
            "city",
            "zip_code",
            "country",
            "contact_number",
            "latitude",
            "longitude",
          ],
        },
        {
          model: Tag,
          attributes: ["name"],
        },
      ],
    });
    const worker = workerData.get({ plain: true });
    is_edit = false;
    if (req.session.user_id === worker.id) {
      is_edit = true;
    }
    res.render("profile", {
      worker,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      is_edit,
    });
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
  res.render("aboutus", {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

// Rendering sign up page

router.get("/signup", (req, res) => {
  res.render("signup");
});

// Post sign up api

// Rendering contact us page
router.get("/contact", (req, res) => {
  res.render("contact", {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});
// Rendering order page
router.get("/order", (req, res) => {
  const { workerId } = req.query;
  res.render("order", {
    workerId,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
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
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
