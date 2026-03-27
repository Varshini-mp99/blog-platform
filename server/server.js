const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB connection */
mongoose.connect(
"mongodb+srv://admin:Varshini2004@cluster0.m6bt3di.mongodb.net/blogDB?retryWrites=true&w=majority"
)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

/* Schema */
const PostSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", PostSchema);

/* test */
app.get("/", (req,res)=>{
  res.send("API running");
});

/* get posts */
app.get("/posts", async (req,res)=>{
  try{
    const posts = await Post.find().sort({_id:-1});
    res.json(posts);
  }catch(err){
    res.status(500).json(err);
  }
});

/* create */
app.post("/posts", async (req,res)=>{
  try{
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  }catch(err){
    res.status(500).json(err);
  }
});

/* delete */
app.delete("/posts/:id", async (req,res)=>{
  try{
    await Post.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  }catch(err){
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, ()=>{
  console.log("Server running");
});