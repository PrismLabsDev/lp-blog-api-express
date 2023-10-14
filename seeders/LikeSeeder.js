const { faker } = require('@faker-js/faker');

const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const ArticleLike = require('../models/ArticleLike');
const CommentLike = require('../models/CommentLike');

const run = async () => {
  const allUsers = await User.find();
  const allArticles = await Article.find();
  const allComments = await Comment.find();

  // Create random article likes
  await Promise.all(allUsers.map(async (user, index) => {
    await Promise.all(allArticles.map(async (article, index) => {
      if( Math.random() < 50/100 ) {
        await new ArticleLike({
          user: user,
          article: article
        }).save();
      }
    }));

    await Promise.all(allComments.map(async (comment, index) => {
      if( Math.random() < 50/100 ) {
        await new CommentLike({
          user: user,
          comment: comment
        }).save();
      }
    }));
  }));

  console.log("Like Seeder.");
}

module.exports = run;