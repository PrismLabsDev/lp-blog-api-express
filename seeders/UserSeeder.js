const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const run = async () => {
  // Create general user
  await new User({
    username: "johndoe",
    bio: '',
    email: "johndoe@example.test",
    password: bcrypt.hashSync("password", 10),
    verified: true
  }).save();

  // Create 10 users
  await Promise.all([...Array(10)].map(async (_, index) => {
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();

    await new User({
      username: `${fname}-${lname}`,
      bio: '',
      email: `${fname}-${lname}@example.test`,
      password: bcrypt.hashSync("password", 10),
      verified: true
    }).save();
  }));

  console.log("User Seeder.");
}

module.exports = run;