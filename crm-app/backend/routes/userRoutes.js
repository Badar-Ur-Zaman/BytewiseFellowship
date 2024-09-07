const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Protected routes (example: getting user profile)
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
