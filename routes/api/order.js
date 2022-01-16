const router = require("express").Router();
// const withAuth = require("../../utils/auth");
const { Order } = require("../../models");

// create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      order_address: req.session.order_address,
      city: req.session.city,
      country: req.session.country,
      // tag_id: req.session.tag_id,
      short_description: req.session.short_description,
      email: req.session.email,
      zip: req.session.zip,
    });
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;