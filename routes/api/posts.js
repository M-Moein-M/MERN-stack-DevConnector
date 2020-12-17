const router = require('express').Router();
const { request } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/post
// @desc    create a post
// @access  private
router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  // check for errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    // get user
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/post
// @desc    get all posts
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/post/:id
// @desc    get post by id
// @access  private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // if no post found
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    // check for not valid format of object id
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/post/:id
// @desc    delete a post by id
// @access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized for this action' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    // check for not valid format of object id
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/post/like/:id
// @desc    like a post
// @access  private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // check if post already has been liked
    const filterLikes = post.likes.filter((like) => like.user.toString() === req.user.id);

    if (filterLikes.length > 0) {
      // user liked the post already
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    // check for not valid format of object id
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/post/unlike/:id
// @desc    unlike a post
// @access  private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // check if post already has been liked
    const likeIndex = post.likes.findIndex((like) => like.user.toString() === req.user.id);

    if (likeIndex === -1) {
      // user hasn't liked this post yet
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    post.likes.splice(likeIndex, 1); // remove like

    await post.save();
    res.json(post.likes);
  } catch (err) {
    // check for not valid format of object id
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/post/comment/:id
// @desc    comment on a post
// @access  private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      // get user
      const user = await User.findById(req.user.id).select('-password');

      // get post
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
