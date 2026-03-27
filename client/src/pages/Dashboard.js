import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    await API.post(
      "/blogs",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Blog created successfully ✅");

    setTitle("");
    setContent("");
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    await API.delete(`/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Blog deleted successfully ❌");

    fetchBlogs();
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBlogs();
    }
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>My Blogs</h2>

        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Write content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button style={styles.button} onClick={createBlog}>
          Create Blog
        </button>

        <hr />

        {blogs.map((blog) => (
          <div key={blog._id} style={styles.card}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <small>
              By {user} • {new Date(blog.createdAt).toLocaleDateString()}
            </small>

            <br />
            <br />

            <div style={styles.buttonRow}>
              <button
                style={styles.editBtn}
                onClick={() => navigate(`/edit/${blog._id}`)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteBlog(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "90%",
    maxWidth: "800px",
    margin: "auto",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "10px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#333",
    color: "white",
    border: "none",
    marginBottom: "10px",
    cursor: "pointer",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  editBtn: {
    width: "48%",
    padding: "10px",
    background: "#2196f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  deleteBtn: {
    width: "48%",
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Dashboard;