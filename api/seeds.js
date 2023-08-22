const User = require("./models/userModel");
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = process.env.KEY;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

async function createUser() {
  const user = new User({
    username: faker.internet.userName(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: process.env.TEST_PASS,
    joinedAt: faker.date.past(),
  });

  await user.save();
}

for (let x = 0; x < 10; x++) {
  createUser();
}
