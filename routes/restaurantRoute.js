const router = require('express').Router()
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Restaurant
router.post('/create', authMiddleware, restaurantController.createRestaurantController)



module.exports = router; 