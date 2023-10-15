const { faker } = require('@faker-js/faker');

const User = require('../models/User');
const UserFollowing = require('../models/UserFollowing');

const run = async () => {
  const allUsers = await User.find();

  // Create random article likes
  await Promise.all(allUsers.map(async (user, index) => {
    await Promise.all(allUsers.map(async (userToFollow, index) => {
      if( Math.random() < 50/100 ) {
        await new UserFollowing({
          user_id: user,
          following_user_id: userToFollow
        }).save();
      }
    }));
  }));

  console.log("Follow Seeder.");
}

module.exports = run;