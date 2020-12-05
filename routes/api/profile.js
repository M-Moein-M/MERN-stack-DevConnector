const router = require('express').Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const user = require('../../models/User');

// @route   GET api/profile/me
// @desc get current user's profile
// @access private

router.get('/me', auth, async (req, res) => {
  try {
    // get the profile from database
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "There's no profile for this user" });
    }

    profile.populated('user', ['name', 'avatar']);

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
