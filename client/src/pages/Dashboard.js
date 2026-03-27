import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://blog-platform-api-5n5q.onrender.com/api/posts"
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://blog-platform-api-5n5q.onrender.com/api/posts",
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <h2>Create Post</h2>

      <form onSubmit={createPost}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create</button>
      </form>

      <h2>All Posts</h2>

      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}