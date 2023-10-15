const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true }
}, { timestamps: true });

schema.methods.toJSON = function () {
  const schemaObject = this.toObject();
  schemaObject.id = schemaObject._id;
  return schemaObject;
};

const ArticleLike = mongoose.model('ArticleLike', schema);

module.exports = ArticleLike;