import React, { useState } from 'react';
import twitterImage from "../../assests/images/twitter.jpeg"
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom';
import "./Login.css"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error ,setError] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

 

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  if (user || googleUser) {
    navigate('/');
}
if (error) {
    //console.log(error);
}
if (loading) {
    console.log("loading...");
}
  
  const handleSubmit =  (e) => {
    
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
    
    const user={
      username:username,
      name:name,
      email:email,
    }
    const {data}=axios.post(`http://localhost:8000/register`, user)

    console.log(data);
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  return (
    <div className='login-container'>
      <div className='image-container'>
        <img className='image' src={twitterImage} />
      </div>
      <div className='form-container'>
        <div className='form-box'>
          <TwitterIcon className='Twittericon'
            style={{ color: 'skyblue' }} />
          <h2 className='heading'>Happening Now</h2>
          <h3 className='heading1'>Join Twitter today</h3>

          <form onSubmit={handleSubmit}>
            <input type='text'
              className='display-name'
              placeholder='@username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <input className='display-name'
              placeholder='Enter Full Name'
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='email'
              placeholder='Enter Your Email'
              className='email'
              onChange={(e) => setEmail(e.target.value)}>
            </input>
            <input className="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='btn-login'>
              <button type='submit' className='btn'>Sign Up</button>
            </div>
          </form>
          <hr />
          <div className='google-button'>
            <GoogleButton
              className='g-btn'
              type='light'
              onClick={handleGoogleSignIn} />
          </div>
          <div>
            Already have an account?
            <Link to="/login"
              style={{
                textDecoration: 'none',
                color: 'skyblue',
                fontWeight: '6000',
                marginLeft: '5px'
              }}>
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp