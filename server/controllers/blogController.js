const Blog = require("../models/Blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user,
    });

    res.status(201).json(blog);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user owns the blog
    if (blog.author.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check ownership
    if (blog.author.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await blog.deleteOne();

    res.json({ message: "Blog deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};