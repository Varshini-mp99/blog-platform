const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb+srv://username:password@cluster.mongodb.net/blog"
);

const Post = mongoose.model("Post", {
title:String,
content:String
});