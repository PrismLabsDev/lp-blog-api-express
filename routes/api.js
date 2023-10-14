const { Router } = require('express');

// Controllers
const IndexController = require('../controllers/IndexController');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const ArticleController = require('../controllers/ArticleController');
const CommentController = require('../controllers/CommentController');

const auth = require('../middleware/tokenAuthentication');

const router = Router();

// Test
router.get('/', IndexController.index);
router.post('/test', auth, IndexController.test);

router.post('/auth/register', AuthController.register);
router.post('/auth/register/verify', AuthController.registerVerification);
router.post('/auth/login', AuthController.login);

// User
router.get('/user', auth, UserController.index);
router.get('/user/:id', auth, UserController.show);
router.put('/user/:id', auth, UserController.update);
router.patch('/user/:id', auth, UserController.update);
router.post('/user/:id/follow', auth, UserController.follow);
router.delete('/user/:id/follow', auth, UserController.unfollow);

// Article
router.get('/article', auth, ArticleController.index);
router.get('/article/:id', auth, ArticleController.show);
router.post('/article', auth, ArticleController.create);
router.patch('/article/:id', auth, ArticleController.update);
router.delete('/article/:id', auth, ArticleController.destroy);
router.post('/article/:id/comment', auth, ArticleController.comment);
router.post('/article/:id/like', auth, ArticleController.like);
router.delete('/article/:id/like', auth, ArticleController.unlike);

// Comments
router.get('/comment/:id', auth, CommentController.show);
router.post('/comment/:id/comment', auth, CommentController.comment);
router.post('/comment/:id/like', auth, CommentController.like);
router.delete('/comment/:id/like', auth, CommentController.unlike);

module.exports = router;