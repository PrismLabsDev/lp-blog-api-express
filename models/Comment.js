const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  body: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model('Comment', schema);

module.exports = Comment;