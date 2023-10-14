const { Router } = require('express');

// Controllers
const IndexController = require('../controllers/IndexController');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

const auth = require('../middleware/tokenAuthentication');

const router = Router();

// Test
router.get('/', IndexController.index);
router.post('/test', auth, IndexController.test);

router.post('/auth/register', AuthController.register);
router.post('/auth/register/verify', AuthController.registerVerification);
router.post('/auth/login', AuthController.login);

router.get('/user', auth, UserController.index);
router.get('/user/:id', auth, UserController.show);
router.put('/user/:id', auth, UserController.update);
router.patch('/user/:id', auth, UserController.update);
router.post('/user/:id/follow', auth, UserController.follow);
router.delete('/user/:id/follow', auth, UserController.unfollow);

module.exports = router;