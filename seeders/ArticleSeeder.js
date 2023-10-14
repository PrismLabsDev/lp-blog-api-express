const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Article = require('../models/Article');

const run = async () => {
  const allUsers = await User.find();

  // Loop over each user
  await Promise.all(allUsers.map(async (user, index) => {
    // Create 25 articles per user
    await Promise.all([...Array(5)].map(async (_, index) => {

      const title = faker.lorem.words(5);
      const slug = title.replaceAll(" ", "_").toLowerCase();

      await new Article({
        user: user,
        slug: slug,
        title: title,
        body: faker.lorem.paragraphs(10),
      }).save();
    }));
  }));

  console.log("Article Seeder.");
}

module.exports = run;