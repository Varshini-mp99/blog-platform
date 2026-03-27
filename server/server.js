const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb+srv://admin:Varshini2004@cluster0.m6bt3di.mongodb.net/blogDB?retryWrites=true&w=majority"
)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

/* User model */
const User = mongoose.model("User",{
email:String,
password:String
});

/* Post model */
const Post = mongoose.model("Post",{
title:String,
content:String
});

/* test */
app.get("/",(req,res)=>{
res.send("API running")
});

/* LOGIN */
app.post("/login", async(req,res)=>{
const {email,password} = req.body

const user = await User.findOne({email,password})

if(!user){
return res.status(401).json("Invalid")
}

res.json(user)
})

/* REGISTER (optional) */
app.post("/register", async(req,res)=>{
const user = new User(req.body)
await user.save()
res.json(user)
})

/* GET POSTS */
app.get("/posts", async(req,res)=>{
const posts = await Post.find().sort({_id:-1})
res.json(posts)
})

/* CREATE POST */
app.post("/posts", async(req,res)=>{
const post = new Post(req.body)
await post.save()
res.json(post)
})

/* DELETE POST */
app.delete("/posts/:id", async(req,res)=>{
await Post.findByIdAndDelete(req.params.id)
res.send("Deleted")
})

const PORT = process.env.PORT || 10000

app.listen(PORT,()=>{
console.log("Server running")
})