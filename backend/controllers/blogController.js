const BlogPost = require('../models/BlogPost');

exports.listPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await BlogPost.findBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
