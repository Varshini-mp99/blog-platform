import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const API = "https://blog-platform-api-5n5q.onrender.com";

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      await axios.post(`${API}/posts`, {
        title,
        content,
      });

      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="container">
      
      {/* Navbar */}
      <div className="navbar">
        <h2>Blog App</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h2>Dashboard</h2>

      {/* Create Post */}
      <div className="create-box">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createPost}>Create Blog</button>
      </div>

      <hr />

      {/* Posts */}
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <div className="post-buttons">
            <button
              className="delete"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}