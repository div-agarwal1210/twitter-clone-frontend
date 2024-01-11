import React, { useEffect, useState } from 'react'
import './Feed.css'
import TweetBox from './TweetBox/TweetBox'
import Post from './Post/Post';
function Feed() {
    const [post,setPost] = useState([]);

    useEffect(()=>{
        fetch('https://twitter-clone-backend-hyxq.onrender.com/post')
        .then(res=>res.json())
        .then(data=>{
            setPost(data);
        })
    },[post])
  return (
    <div className="feed">
        <div className="feed__header">
            <h2>Home</h2>
        </div>
        <TweetBox />
        {
          post.map(p=><Post key={p._id} p={p} />)  
        }
    </div>

)
}

export default Feed