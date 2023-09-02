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
      bio: faker.person.bio(),
      jobTitle: faker.person.jobTitle(),
      homeLocation: faker.location.city(),
      relationshipStatus: Math.random() < 0.5 ? "Single" : "Married",
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
      bio: faker.person.bio(),
      jobTitle: faker.person.jobTitle(),
      homeLocation: faker.location.city(),
      relationshipStatus: Math.random() < 0.5 ? "Single" : "Married",
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
        text: faker.lorem.sentence(),
      });
      await comment.save();
    }
  });
}
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
async function populateFriends() {
  const usersList = await User.find({}).exec();

  //users.forEach(async (user) => {

  for (let x = 0; x < usersList.length; x++) {
    const users = await User.find({}).exec();
    const index = users.indexOf(users[x]);
    const usersArr = [...users];
    const removed = usersArr.splice(x, 1);
    //console.log(index, usersArr, usersArr.length)
    const randomFriends = shuffleArray(usersArr).slice(
      randomIntFromInterval(0, 5),
      7
    );
    console.log(randomFriends, randomFriends.length);
    const randomFriendIds = [];
    randomFriends.forEach((friend) => randomFriendIds.push(friend._id));

    //console.log(randomFriendIds)
    randomFriendIds.forEach(async (id) => {
      const isFriend = users[x].friends.some((user) => user._id === id);

      if (!isFriend) {
        const updatedUser = await User.findByIdAndUpdate(users[x]._id, {
          $push: { friends: id },
        }).exec();
      }
    });

    randomFriends.forEach(async (friend) => {
      const updatedFriend = await User.findByIdAndUpdate(friend._id, {
        $push: { friends: users[x]._id },
      }).exec();
    });
  }

  //});
}
 /*
for (let x = 0; x < 10; x++) {
  createUser();
}
createUser("user");

/*
createPosts()
createComments() 
populateFriends();
;

*/
populateFriends();
