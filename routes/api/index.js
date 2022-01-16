const router = require("express").Router();
const userRoutes = require("./userRoutes");
const orderRoutes = require("./order");

router.use("/users", userRoutes);
router.use("/order", orderRoutes);

module.exports = router;
