const User = require("./user");
const Worker = require("./worker");
const Order = require("./order");
const Tag = require("./tag");
const Contact = require("./contact");
const Review = require("./review");

Worker.belongsTo(Tag, {
  foreignKey: "tag_id",
});

Tag.hasMany(Worker, {
  foreignKey: "tag_id",
});

Worker.hasOne(Contact, {
  foreignKey: "worker_id",
});

Contact.belongsTo(Worker, {
  foreignKey: "worker_id",
});

User.hasMany(Order, {
  foreignKey: "user_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

Worker.hasMany(Order, {
  foreignKey: "worker_id",
});

Order.belongsTo(Worker, {
  foreignKey: "worker_id",
});

User.hasMany(Review, {
  foreignKey: "user_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

Worker.hasMany(Review, {
  foreignKey: "worker_id",
});

Review.belongsTo(Worker, {
  foreignKey: "worker_id",
});

// We package our models and export them as an object so we can import them together and use their proper names
module.exports = { User, Worker, Order, Tag, Contact, Review };
