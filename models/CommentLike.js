const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }
}, { timestamps: true });

const CommentLike = mongoose.model('CommentLike', schema);

module.exports = CommentLike;