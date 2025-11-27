const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({}).populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog post with comments
// @route   GET /api/blog/:id
// @access  Public
const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');

    if (post) {
      const comments = await Comment.find({ post: post._id })
        .populate('author', 'username')
        .sort({ createdAt: -1 });

      res.json({
        ...post.toObject(),
        comments
      });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await BlogPost.create({
      title,
      content,
      author: req.user._id
    });

    const populatedPost = await BlogPost.findById(post._id).populate('author', 'username');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private (Author only)
const updateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await BlogPost.findById(req.params.id);

    if (post) {
      // Check if user is the author
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this post' });
      }

      post.title = title || post.title;
      post.content = content || post.content;

      const updatedPost = await post.save();
      const populatedPost = await BlogPost.findById(updatedPost._id).populate('author', 'username');
      res.json(populatedPost);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private (Author only)
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (post) {
      // Check if user is the author
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this post' });
      }

      // Delete all comments associated with this post
      await Comment.deleteMany({ post: post._id });

      await BlogPost.deleteOne({ _id: req.params.id });
      res.json({ message: 'Blog post removed' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for a blog post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a comment on a blog post
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { body } = req.body;

    const post = await BlogPost.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId
    });

    const populatedComment = await Comment.findById(comment._id).populate('author', 'username');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getComments,
  createComment
};
