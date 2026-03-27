const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* MongoDB connection */
mongoose.connect(
"mongodb://admin:Varshini2004@ac-th3dnmi-shard-00-00.m6bt3di.mongodb.net:27017,ac-th3dnmi-shard-00-01.m6bt3di.mongodb.net:27017,ac-th3dnmi-shard-00-02.m6bt3di.mongodb.net:27017/blogDB?ssl=true&replicaSet=atlas-engn42-shard-0&authSource=admin&appName=Cluster0"
)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

/* model */
const Post = mongoose.model("Post", {
  title: String,
  content: String,
});

/* test route */
app.get("/", (req, res) => {
  res.send("API running");
});

/* get posts */
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

/* create post */
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({
    title,
    content
  });

  await post.save();
  res.json(post);
});

/* delete post */
app.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

/* start server */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});