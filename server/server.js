const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_URL");

const Post = mongoose.model("Post", {
  title: String,
  content: String,
});

app.get("/", (req, res) => {
  res.send("API Running");
});

/* GET POSTS */
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

/* CREATE POST */
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
  });

  await post.save();
  res.json(post);
});

/* DELETE POST */
app.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});