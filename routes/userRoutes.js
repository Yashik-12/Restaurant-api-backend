const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = require('express').Router()


// GET User Data
router.get('/get-user', authMiddleware, userController.getUserController)

// Update user Data
router.put('/update-user', authMiddleware, userController.updateUserController)

// Password Update
router.post('/update-password', authMiddleware, userController.updatePasswordController)

// Reset Password
router.post('/reset-password', authMiddleware, userController.resetPasswordController)

// Delete User
router.delete('/delete-user/:id', authMiddleware, userController.deleteUserController)

module.exports = router; 