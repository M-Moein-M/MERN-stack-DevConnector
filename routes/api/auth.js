const router = require('express').Router();
const auth = require('../../middleware/auth');
const User = require('./../../models/User');

// @route   GET api/auth

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
