const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true });

schema.methods.toJSON = function () {
  const schemaObject = this.toObject();
  schemaObject.id = schemaObject._id;
  return schemaObject;
};

const Article = mongoose.model('Article', schema);

module.exports = Article;