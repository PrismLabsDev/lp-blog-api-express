const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }
}, { timestamps: {
  createdAt: 'created_at', // Use `created_at` to store the created date
  updatedAt: 'updated_at' // and `updated_at` to store the last updated date
} });

schema.methods.toJSON = function () {
  const schemaObject = this.toObject();
  schemaObject.id = schemaObject._id;
  return schemaObject;
};

const CommentLike = mongoose.model('CommentLike', schema);

module.exports = CommentLike;