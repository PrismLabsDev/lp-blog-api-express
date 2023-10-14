const { Router } = require('express');

// Controllers
const IndexController = require('../controllers/IndexController');
const AuthController = require('../controllers/AuthController');

const router = Router();

// Test
router.get('/', IndexController.index);
router.post('/test', IndexController.test);

router.post('/auth/register', AuthController.register);
router.post('/auth/register/verify', AuthController.registerVerification);
router.post('/auth/login', AuthController.login);

module.exports = router;