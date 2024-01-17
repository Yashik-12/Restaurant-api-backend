const authController = require('../controllers/authController');

const router = require('express').Router()


// Register route
router.post('/register', authController.registerController)

//Login Route
router.post('/login', authController.loginController)


module.exports = router;