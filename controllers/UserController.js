const Joi = require('joi');

const User = require('../models/User');
const UserFollowing = require('../models/UserFollowing');

const index = async (req, res) => {
  try {

    const userQuery = User.find();

    if(req.query.username){
      userQuery.where('username').regex(new RegExp(req.query.username, 'i'));
    }

    if(req.query.bio){
      userQuery.where('bio').regex(new RegExp(req.query.username, 'i'));
    }

    const users = await userQuery.exec();

    return res.status(200).json({
      message: 'Get list of users.',
      users: users
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const show = async (req, res) => {
  try {

    const user = await User.findOne().where({_id: req.params.id}).exec();

    return res.status(200).json({
      message: 'Get user.',
      user: user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const update = async (req, res) => {

  try {

    await Joi.object({
      bio: Joi.string().required()
    }).validateAsync(req.body);

    const user = await User.findOne().where({_id: req.params.id}).exec();

    user.bio = req.body.bio;
    user.save();

    return res.status(200).json({
      message: 'Updated user.',
      user: user
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
      error: error
		});

  }
};

const follow = async (req, res) => {

  try {
    const alreadyFollowing = await UserFollowing.findOne().where({user_id: req.user._id}).where({following_user_id: req.params.id}).exec();

    if(alreadyFollowing){
      return res.status(200).json({
        message: 'You are already following this user.',
      });
    }

    const followingUser = await User.findOne().where({_id: req.params.id}).exec();

    const newUserFollowing = new UserFollowing({
      user_id: req.user._id,
      following_user_id: followingUser._id,
    });
    await newUserFollowing.save();

    return res.status(200).json({
      message: 'You are now following this user.',
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
      error: error
		});

  }
};

const unfollow = async (req, res) => {

  try {

    const removedFollowings = await UserFollowing.deleteMany().where({user_id: req.user._id}).where({following_user_id: req.params.id}).exec();

    return res.status(200).json({
      message: 'Removed following for this user.'
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
      error: error
		});

  }
};

module.exports = {
	index,
  show,
  update,
  follow,
  unfollow
};