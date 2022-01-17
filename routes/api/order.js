const router = require("express").Router();
const withAuth = require("../../utils/auth");
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
      // worker_id: 
    });
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete order
router.delete("/:id", withAuth, (req, res) => {
  Order.destroy({
    where: {
      id: req.params.id,
    },
  }).then((orderData) => {
    if (!orderData) {
      res.status(404).json({ message: "No order found with this ID" });
      return;
    }
    res.json(orderData);
  });
});

module.exports = router;
