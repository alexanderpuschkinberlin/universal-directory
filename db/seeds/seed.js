const sequalize = require("../../config/connection");
const { User, Worker, Tag, Expertise, Contact } = require("../../models");
// ToDo preprare seeds for Reviews and Orders

const contactsData = require("./contacts.json");
const expertiseData = require("./expertises.json");
const tagsData = require("./tags.json");
const usersData = require("./users.json");
const workersData = require("./workers.json");

const seedDatabase = async () => {
  await sequalize.sync({ force: true });

  const workers = await Worker.bulkCreate(workersData, {
    individualHooks: true,
    returning: true,
  });

  console.log("//---------Workers seeded-----------//");

  const users = await User.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  console.log("//---------Users seeded-----------//");

  const contacts = await Contact.bulkCreate(contactsData);

  console.log("//---------Contacs seeded-----------//");

  const tags = await Tag.bulkCreate(tagsData);

  console.log("//---------Tags seeded-----------//");

  const expertises = await Expertise.bulkCreate(expertiseData);

  console.log("//---------Expertises seeded-----------//");

  process.exit(0);
};

seedDatabase();
