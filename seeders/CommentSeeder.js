const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

const run = async () => {
  const allUsers = await User.find();
  const allArticles = await Article.find();

  // Loop over each article
  await Promise.all(allArticles.map(async (article, index) => {
    // Create 20 comments per article
    await Promise.all([...Array(10)].map(async (_, index) => {

      const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

      await new Comment({
        user_id: randomUser,
        article_id: article,
        comment_id: null,
        body: faker.lorem.words(10),
      }).save();
    }));
  }));

  const allPrimaryComments = await Comment.find();

  // Loop over each comment
  await Promise.all(allPrimaryComments.map(async (comment, index) => {
    // Create 10 comments per existing comment
    await Promise.all([...Array(5)].map(async (_, index) => {

      const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

      await new Comment({
        user_id: randomUser,
        article_id: comment.article_id,
        comment_id: comment,
        body: faker.lorem.words(10),
      }).save();
    }));
  }));

  console.log("Comment Seeder.");
}

module.exports = run;