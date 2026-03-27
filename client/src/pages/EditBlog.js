import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

function EditBlog() {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate(); // navigation

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get("/blogs");

        const blog = res.data.find((b) => b._id === id);

        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlog();
  }, [id]);

  // update blog
  const updateBlog = async () => {
    try {
      await API.put(
        `/blogs/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog updated successfully ✏️");

      navigate("/dashboard");
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Edit Blog</h2>

        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          style={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <button style={styles.button} onClick={updateBlog}>
          Update Blog
        </button>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    marginTop: "20px",
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
    padding: "10px 20px",
    background: "#2196f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default EditBlog;