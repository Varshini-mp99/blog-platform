const express = require("express");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;