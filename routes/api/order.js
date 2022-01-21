const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Order } = require("../../models");

// create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      order_address: req.body.order_address,
      city: req.body.city,
      country: req.body.country,
      short_description: req.body.short_description,
      email: req.body.email,
      zip: req.body.zip,
      worker_id: req.body.worker_id,
      status: "Active",
    });
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete order
router.put("/:id", (req, res) => {
  console.log("Updating " + req.params.id + " to " + req.body.status);
  Order.update(
    {
      status: req.body.status,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((orderStatus) => {
      if (!orderStatus) {
        res.status(404).json({ message: "No order found with this ID." });
        return;
      }
      res.json(orderStatus);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
