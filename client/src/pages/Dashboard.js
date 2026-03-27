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
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Content"
value={content}
onChange={(e)=>setContent(e.target.value)}
/>

<button onClick={createPost}>
Create Blog
</button>
</div>

<hr/>

{/* Posts */}
{posts.map(post=>(
<div className="post-card" key={post._id}>

<h3>{post.title}</h3>
<p>{post.content}</p>

<div className="post-buttons">
<button
className="delete"
onClick={()=>deletePost(post._id)}
>
Delete
</button>
</div>

</div>
))}

</div>
)