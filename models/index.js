const User = require("./user");
const Worker = require("./worker");
const Order = require("./order");
const Tag = require("./tag");
const Expertise = require("./expertise");
const Contact = require("./contact");

// User.hasMany(Post, {
//   foreignKey: "user_id",
// });

// Post.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
// });

// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   // When we delete a Post, we make sure to also delete the associated comments.
//   onDelete: "CASCADE",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// We package our models and export them as an object so we can import them together and use their proper names
module.exports = { User, Worker, Order, Tag, Expertise, Contact };
