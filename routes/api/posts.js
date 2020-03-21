const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator/check')

//@route        POST api/posts
//@desc         Create Post
//@access       Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })
      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error ..')
    }
  }
)
//@route        GET api/posts/all
//@desc         GET all posts
//@access       Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().populate('post', ['name', 'avatar'])
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error ..')
  }
})
//@route        GET api/posts/:id
//@desc         GET post by id
//@access       Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(400).json({ msg: 'No post Found' })
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post Found' })
    }
    console.error(err.message)
    res.status(500).send('Server Error ..')
  }
})
//@route        DELETE api/posts/:id
//@desc         DELETE post, user  posts
//@access       Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //GET post by id
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(400).json({ msg: 'No post Found' })
    }
    //Check user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized ' })

    //remove post
    await post.remove()

    res.json({ msg: 'Post removed' })
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post Found' })
    }
    console.error(err.message)
    res.status(500).send('Server Error ..')
  }
})

//@route        PUT api/posts/like/:id
//@desc         Like a post
//@access       Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    //GET post by id
    const post = await Post.findById(req.params.id)
    //Check if post has already been liked
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Pst already liked' })
    }
    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post Found' })
    }
    console.error(err.message)
    res.status(500).send('Server Error ..')
  }
})

//@route        PUT api/posts/unlike/:id
//@desc         Like a post
//@access       Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    //GET post by id
    const post = await Post.findById(req.params.id)
    //Check if post has already been liked then unlike it
    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' })
    }
    //Get the remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id)
    post.likes.splice(removeIndex, 1)
    await post.save()
    res.json(post.likes)
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post Found' })
    }
    console.error(err.message)
    res.status(500).send('Server Error ..')
  }
})

//@route        POST api/posts/comment/:id
//@desc         Comment on a post
//@access       Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)
      const newComm = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })
      post.comments.unshift(newComm)
      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error ..')
    }
  }
)

//@route        PUT api/posts/comment/:id/:comment_id
//@desc         Delete comment
//@access       Private
router.put('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    //GET post by id
    const post = await Post.findById(req.params.id)
    //Pull out a comment from a post
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )

    if (!comment) {
      return res.status(404).json({ msg: 'No comment' })
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }
    //Get the remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id)
    post.comments.splice(removeIndex, 1)
    await post.save()
    res.json(post.likes)
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No comment' })
    }
    console.error(err.message)
    res.status(500).send('Server Error ..')
  }
})
module.exports = router
