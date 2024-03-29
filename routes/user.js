const express = require('express');

const router = express.Router();

const { login, signup } = require('../controllers/Auth.js');
const { auth, isAdmin } = require('../middlewares/auth.js');

router.post('/login', login);
router.post('/signup', signup);

// protected route
router.get('/admin', auth, isAdmin, (req, res) => {
  res.json({ success: true, message: 'Welcome to Admin route' });
});

module.exports = router;
