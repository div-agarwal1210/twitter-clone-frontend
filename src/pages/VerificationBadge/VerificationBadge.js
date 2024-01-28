import React, { useState } from 'react'
import UseLoggedInUser from '../../Hooks/UseLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import "./VerificationBadge.css"
import axios from 'axios';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from "react-router-dom"

const VerificationBadge = () => {
  const user = useAuthState(auth);
  const [loggedInUser] = UseLoggedInUser();
  const username = user[0]?.email?.split('@')[0];
  console.log(loggedInUser[0]?.name);
  const [profession, setProfession] = useState("")
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState(false);
  const [verified, setVerified] = useState(true);
  const navigate = useNavigate();
  
  
  const handleSave = async () => {
    const badgeInfo = {
      profession,
      description,
      badge,
      verified
    }
    navigate('/')
    if (badgeInfo) {
      await axios.patch(`https://twitter-clone-backend-hyxq.onrender.com/userUpdates/${user[0]?.email}`, badgeInfo)
    }
  }
  
  return (
    
    <div className='login-container2'>
      <div className='form-container2'>
        <div className='form-box2'>
        <h2 className='heading'>Payment Succesfull .... </h2>
          <div>
            <TwitterIcon className='Twittericon'
            style={{ color: 'skyblue', scale: "2x" }}
          />
        

          <div className='verifyImage'>
          <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" className='verifyImage' />
        </div>
          <h2 className='heading1'>{loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user.displayName}</h2>
          <h3 className='heading1'>@{username}</h3>

          <form onSubmit={handleSave}>
            <input
              type='text'
              placeholder='Enter Your Profession'
              className='profession'
              onChange={(e) => setProfession(e.target.value)}
            >
            </input>
            <input type='text'
              placeholder='Enter a small Description'
              className='profession'
              onChange={(e) => setDescription(e.target.value)}
            >
            </input>
            <div className='b'>
              <button type='submit' className='btns'>Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationBadge