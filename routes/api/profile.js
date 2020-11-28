const router = require('express').Router();

// @route   GET api/profile

router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
