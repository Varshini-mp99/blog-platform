import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchPosts();
  }, [token, navigate]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3>Your Posts</h3>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;