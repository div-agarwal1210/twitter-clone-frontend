import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
//import { useUserAuth } from "../../../context/UserAuthContext";
import UseLoggedInUser from "../../../Hooks/UseLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

function TweetBox() {
  const [post, setPost] = useState('')
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState(' ');
  const [loggedInUser] = UseLoggedInUser();
  //console.log(loggedInUser);
  const [ user ] = useAuthState(auth);
    const email = user?.email;

  const userProfilePic =loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

  const handleUploadImage = (e)=>{
      setIsLoading(true)
      const image = e.target.files[0];
      console.log(image);

      const formData = new FormData();
      formData.set('image', image)

      axios.post("https://api.imgbb.com/1/upload?key=8c455702dd7d568f881c328c08374711", formData)
      .then(res =>{
        setImageURL(res.data.data.display_url)
        console.log((res.data.data.display_url));
        setIsLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setIsLoading(false);
      })
  }

  const handleTweet = (e) => {
    e.preventDefault();
        console.log(user.providerData[0].providerId);
       if (user.providerData[0].providerId=== 'password'){
        fetch(`https://twitter-clone-backend-hyxq.onrender.com/loggedInUser?email=${email}`)
        .then(res => res.json())
        .then(data => {
            //console.log('from useLoggedinuser', data)
            setName(data[0]?.name)
            setUsername(data[0]?.username)
        })
       }
       else{
        setName(user?.displayName)
        setUsername(email?.split('@')[0])
       }
      if(name){
    const userPost = {
      profilePhoto: userProfilePic,
      post:post,
      photo:imageURL,
      username:username,
      name:name,
      user:user,
      email:email
      
    }
  
    //console.log(userPost);
    setPost('');
    setImageURL('');
    fetch('https://twitter-clone-backend-hyxq.onrender.com/post',{
      method: "POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(userPost)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
  }
}
  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}/>
          <input type="text"
            placeholder="What's happening"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {
              isLoading ? <p>Uploading ..</p>:<p>{ imageURL? 'Uploaded':
              <AddPhotoAlternateIcon />}</p>
          }</label>
          <input type="file" id="image" className="imageInput" 
          onChange={handleUploadImage}/>
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TweetBox