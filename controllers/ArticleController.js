const Joi = require('joi');

const Article = require('../models/Article');
const Comment = require('../models/Comment');
const ArticleLike = require('../models/ArticleLike');

const index = async (req, res) => {
  try {

    const articleQuery = Article.find();

    if(req.query.title){
      articleQuery.where('title').regex(new RegExp(req.query.title, 'i'));
    }

    if(req.query.body){
      articleQuery.where('body').regex(new RegExp(req.query.body, 'i'));
    }

    const articles = await articleQuery.exec();

    return res.status(200).json({
      message: 'List of all matching articles.',
      articles: articles
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
    const article = await Article.findOne().where({slug: req.params.slug}).exec();

    return res.status(200).json({
      message: 'Show article.',
      article: article
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const create = async (req, res) => {
  try {

    await Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required()
    }).validateAsync(req.body);

    const formattedSlugFromTitle = req.body.title.replaceAll(" ", "_").replace(/[^\w\s\d]+/gi, '-').toLowerCase();

    const newArticle = new Article({
      user: req.user._id,
      slug: formattedSlugFromTitle,
      title: req.body.title,
      body: req.body.body,
    });
    await newArticle.save();

    return res.status(200).json({
      message: 'New article created.',
      article: newArticle
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

    const article = await Article.findOne().where({slug: req.params.slug}).exec();
    
    if(!article){
      return res.status(404).json({
        message: 'No matching article found.'
      });
    }

    if(!req.user._id.equals(article.user)){
      return res.status(401).json({
        message: 'This article does not belong to you.'
      });
    }

    if(req.body.title){
      article.title = req.body.title;
      article.slug = req.body.title.replaceAll(" ", "_").replace(/[^\w\s\d]+/gi, '-').toLowerCase();
    }

    if(req.body.body){
      article.body = req.body.body;
    }

    article.save();

    return res.status(200).json({
      message: 'Updated article.',
      article: article
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const destroy = async (req, res) => {
  try {

    const article = await Article.findOne().where({slug: req.params.slug}).exec();

    if(!req.user._id.equals(article.user)){
      return res.status(401).json({
        message: 'This article does not belong to you.'
      });
    }

    article.deleteOne();

    return res.status(200).json({
      message: 'Article removed.'
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

    const article = await Article.findOne().where({slug: req.params.slug}).exec();

    const newArticleComment = new Comment({
      user: req.user._id,
      article: article._id,
      comment: null,
      body: req.body.body,
    });
    await newArticleComment.save();

    return res.status(200).json({
      message: 'New comment added to article.',
      article: article,
      comment: newArticleComment
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

    const article = await Article.findOne().where({slug: req.params.slug}).exec();
    const alreadyLiked = await ArticleLike.findOne().where({user: req.user._id}).where({article: article._id}).exec();

    if(alreadyLiked){
      return res.status(200).json({
        message: 'You already like this article.',
      });
    }

    const newArticleLike = new ArticleLike({
      user: req.user._id,
      article: article._id,
    });
    await newArticleLike.save();

    return res.status(200).json({
      message: 'Article liked.',
      article: article
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

    const article = await Article.findOne().where({slug: req.params.slug}).exec();
    const removedLikes = await ArticleLike.deleteMany().where({user: req.user._id}).where({article: article.id}).exec();

    return res.status(200).json({
      message: 'Removed article like.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
	index,
  show,
  create,
  update,
  destroy,
  comment,
  like,
  unlike
};