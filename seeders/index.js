require('dotenv').config();
const database = require('../db');

const UserSeeder = require('./UserSeeder');
const ArticleSeeder = require('./ArticleSeeder');
const CommentSeeder = require('./CommentSeeder');
const LikeSeeder = require('./LikeSeeder');
const FollowingSeeder = require('./FollowingSeeder');

(async function () {
  // Create connection and destroy database
  const connection = await database.createConnection();
  await connection.dropDatabase();

  // Create global connection
  await database.connect();
  
  // Seeder functions
  await UserSeeder();
  await ArticleSeeder();
  await CommentSeeder();
  await LikeSeeder();
  await FollowingSeeder();

  console.log('Done.');

  // Close connection
  database.close();
})();