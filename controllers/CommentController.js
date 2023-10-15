const Joi = require('joi');

const User = require('../models/User');
const Comment = require('../models/Comment');
const CommentLike = require('../models/CommentLike');

const show = async (req, res) => {
  try {

    const comment = await Comment.findOne().where({_id: req.params.id}).exec();
    const childComments = await Comment.find().where({comment_id: comment._id}).exec();

    const responseComment = comment.toObject();
    responseComment.user = await User.findOne().where({_id: comment.user_id});
    responseComment.liked = await CommentLike.find().where({comment_id: comment._id}).where({user: req.user._id}).count() > 0;
    responseComment.comments_count = childComments.length;

     responseComment.comments = await Promise.all(childComments.map(async (childComment) => {
      let childCommentObject = childComment.toObject();
      childCommentObject.user = await User.findOne().where({_id: childComment.user_id});
      childCommentObject.liked = await CommentLike.find().where({comment_id: childComment._id}).where({user: req.user._id}).count() > 0;
      childCommentObject.comments_count = await Comment.find().where({comment_id: childComment._id}).count();
      return childCommentObject;
    }));

    return res.status(200).json({
      message: 'Comment.',
      comment: responseComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const comment = async (req, res) => {
  try {

    await Joi.object({
      body: Joi.string().required()
    }).validateAsync(req.body);

    const parentComment = await Comment.findOne().where({_id: req.params.id}).exec();

    const newComment = new Comment({
      user_id: req.user._id,
      article_id: parentComment.article,
      comment_id: parentComment._id,
      body: req.body.body,
    });
    await newComment.save();

    return res.status(200).json({
      message: 'New comment.',
      comment: newComment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const like = async (req, res) => {
  try {

    const comment = await Comment.findOne().where({_id: req.params.id}).exec();
    const alreadyLiked = await CommentLike.findOne().where({user_id: req.user._id}).where({comment_id: comment._id}).exec();

    if(alreadyLiked){
      return res.status(200).json({
        message: 'You already like this comment.',
      });
    }

    const newCommentLike = new CommentLike({
      user_id: req.user._id,
      comment_id: comment._id,
    });
    await newCommentLike.save();

    return res.status(200).json({
      message: 'Comment liked.',
      comment: comment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const unlike = async (req, res) => {
  try {

    const comment = await Comment.findOne().where({_id: req.params.id}).exec();
    const removedLikes = await CommentLike.deleteMany().where({user_id: req.user._id}).where({comment_id: comment._id}).exec();

    return res.status(200).json({
      message: 'Removed comment like.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
  show,
  comment,
  like,
  unlike
};