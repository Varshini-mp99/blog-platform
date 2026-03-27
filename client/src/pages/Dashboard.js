import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
const [blogs, setBlogs] = useState([]);
const navigate = useNavigate();
const token = localStorage.getItem("token");

useEffect(() => {
if (!token) {
navigate("/login");
} else {
fetchBlogs();
}
}, [token, navigate]);

const fetchBlogs = async () => {
try {
const res = await axios.get(
"https://blog-platform-fxci.onrender.com/api/blogs",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);
setBlogs(res.data);
} catch (err) {
console.error(err);
}
};

const deleteBlog = async (id) => {
try {
await axios.delete(
`https://blog-platform-fxci.onrender.com/api/blogs/${id}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);
fetchBlogs();
} catch (err) {
console.error(err);
}
};

return ( <div className="container"> <h2>Dashboard</h2>

```
  <button onClick={() => navigate("/create")}>Create Blog</button>

  {blogs.map((blog) => (
    <div key={blog._id} className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>

      <button onClick={() => navigate(`/edit/${blog._id}`)}>
        Edit
      </button>

      <button onClick={() => deleteBlog(blog._id)}>
        Delete
      </button>
    </div>
  ))}
</div>
```

);
};

export default Dashboard;
