const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true });

const Article = mongoose.model('Article', schema);

module.exports = Article;