//Import statements
import React, { useState, } from 'react';
// import './Login.css';
import { SERVER_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function NewsPage(){

    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${SERVER_URL}/getNews`, {
                mode: "cors",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const result = await res.json();
            setPosts(result.response);
        } catch (error) {
            console.log("Error fetching posts: ", error);
        }
    };

    const postNews = async (title, content) => {
        try {
            const res = await fetch(`${SERVER_URL}/postNews`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    date: new Date().toISOString().slice(0, 10),
                })
            });
            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log("Error posting news: ", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postNews(newTitle, newContent);
        setNewTitle("");
        setNewContent("");
        fetchPosts();
    };

  return(
    // <div className='background'>
    //   
    // </div>
    <div>
      <Sidebar/>
      <div className='postNews' style={{width: 500, display: 'flex', flexDirection:'column', marginTop: 64}}>
        <form onSubmit={handleSubmit} style={{}}>
            <label>Title:</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input>
            <label>Content:</label>
            <textarea type='text' value={newContent} onChange={(e) => setNewContent(e.target.value)}></textarea>
        </form>
        <button type='submit' onClick={handleSubmit}>Post</button>
       </div>
       <div className='newsFeed' style={{width: 500, height: 500, display: 'flex', flexDirection:'column', marginTop: 64}}>
        <h1>News Feed</h1>
        <button onClick={fetchPosts}>Refresh</button>
        {posts.map((post) => (
            <div key={post.newsID}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.date}</p>
            </div>
        ))}
        </div>
    </div>
  );
};

export default NewsPage;


