const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");
const session = require("express-session");
const routes = require("./routes");

// sequalize
const sequalize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3001;

//  handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT:" + PORT));
});
