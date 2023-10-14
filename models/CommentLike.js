const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }
}, { timestamps: true });

schema.methods.toJSON = function () {
  const schemaObject = this.toObject();
  schemaObject.id = schemaObject._id;
  return schemaObject;
};

const CommentLike = mongoose.model('CommentLike', schema);

module.exports = CommentLike;