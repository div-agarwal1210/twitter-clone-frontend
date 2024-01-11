import React, { useState } from 'react';
import twitterImage from "../../assests/images/twitter.jpeg"
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error ,setError] = useState('');
    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (user || googleUser) {
        navigate('/');
    }
    if (error) {
        console.log(error);
    }
    if (loading) {
        console.log("loading...");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
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
                        <input
                            type='email'
                            placeholder='Enter Your Email'
                            className='email'
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        <input type='password'
                            placeholder='Enter Your Password'
                            className='password'
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        <div className='btn-login'>
                            <button type='submit' className='btn'>Login</button>
                        </div>
                    </form>
                </div>
                <hr />
                <div className='google-button'>
                    <GoogleButton
                        className='g-btn'
                        type='light'
                        onClick={handleGoogleSignIn} />
                </div>
                <div>
                    Don't have an account?
                    <Link to="/signup"
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '6000',
                            marginLeft: '5px'
                        }}>
                        SignUp
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login