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
    navigate("/");
  };

  const fetchPosts = async () => {
    const res = await axios.get(`${API}/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!title.trim() || !content.trim()) return;

    await axios.post(`${API}/posts`, {
      title,
      content,
    });

    setTitle("");
    setContent("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="container">
      
      <div className="navbar">
        <h2>Blog App</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h2>Dashboard</h2>

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

        <button onClick={createPost}>
          Create Blog
        </button>
      </div>

      <hr />

      {posts
        .filter((post) => post.title && post.content)
        .map((post) => (
          <div className="post-card" key={post._id}>
            <div className="post-header">
              <h3>{post.title}</h3>
            </div>

            <p className="post-content">{post.content}</p>

            <div className="post-actions">
              <button
                className="delete-btn"
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