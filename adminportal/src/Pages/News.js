//Import statements
import React, { useState, } from 'react';
// import './Login.css';
import { SERVER_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function NewsPage(){

    const [posts, setPosts] = useState([]);

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
            const posts = await res.json();
            setPosts(posts);
        } catch (error) {
            console.log("Error fetching posts: ", error);
        }
    };

    const handleSubmit = (e) => {
    };

  return(
    // <div className='background'>
    //   
    // </div>
    <div>
      <Sidebar/>
      <div className='postNews' style={{width: 500, display: 'flex', flexDirection:'column', marginTop: 64}}>
        <p>Title</p>
        <input name="News Post Title"></input>
        <p>Body</p>
        <input name="News Post Body" />
        {/* {loginError && (<p className='errorMsg'>{errorMessage}</p>)}           */}
        <button type='submit' onClick={handleSubmit}>Post</button>
       </div>
       <div className='newsFeed' style={{width: 500, height: 500, display: 'flex', flexDirection:'column', marginTop: 64}}>
        <h1>News Feed</h1>
        {posts.map((post) => (
            <div key={post.newsID}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.date}</p>
            </div>
        ))}
        <button onClick={fetchPosts}>Refresh</button>
        </div>
    </div>
  );
};

export default NewsPage;


