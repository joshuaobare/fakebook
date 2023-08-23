const User = require("./models/userModel");
const Post = require("./models/postModel");
const Comment = require("./models/commentModel");
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = process.env.KEY;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

async function createUser(user) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  if (user === undefined) {
    const user = new User({
      username: faker.internet.displayName({ firstName, lastName }),
      fullName: firstName + " " + lastName,
      email: faker.internet.email(),
      password: process.env.TEST_PASS,
      joinedAt: faker.date.past(),
      avatar: faker.internet.avatar(),
    });

    await user.save();
  } else {
    const user = new User({
      username: "jjackson",
      fullName: "Jack Jackson",
      email: "admin@gmail.com",
      password: process.env.TEST_PASS,
      joinedAt: faker.date.past(),
      avatar: faker.internet.avatar(),
    });

    await user.save();
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function createPosts() {
  const users = await User.find({}).exec();

  users.forEach(async (user) => {
    for (let x = 0; x < randomIntFromInterval(2, 10); x++) {
      const randomSlice = users.slice(randomIntFromInterval(0, 5), 7);
      const userIds = [];
      randomSlice.forEach((user) => {
        userIds.push(user._id);
      });
      const post = new Post({
        userId: user._id,
        likes: [...userIds],
        text: faker.lorem.paragraphs(),
        timestamp: faker.date.past(),
      });
      await post.save();
    }
  });
}

async function createComments() {
  const users = await User.find({}).exec();
  const posts = await Post.find({}).exec();

  posts.forEach(async (post) => {
    for (let x = 0; x < randomIntFromInterval(2, 5); x++) {
      const randomUser = users[randomIntFromInterval(0, 10)];

      const comment = new Comment({
        userId: randomUser._id,
        timestamp: post.timestamp,
        postId: post._id,
        text: faker.lorem.paragraph(),
      });
      await comment.save();
    }
  });
}
/*
for (let x = 0; x < 10; x++) {
  createUser();
}
createUser("user"); 
createPosts()
createComments() */
