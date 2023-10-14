const { Router } = require('express');

// Controllers
const IndexController = require('../controllers/IndexController');

const router = Router();

// Test
router.get('/', IndexController.index);

module.exports = router;