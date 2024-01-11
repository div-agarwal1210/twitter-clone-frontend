import React from 'react'
import '../Page.css'
import MainProfile from './MainProfile/MainProfile'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'

function Profile() {
  const user  = useAuthState(auth);
  
  return (
    <div className='profilePage'>
            <MainProfile user={user[0]}/>
          </div>
  )
}

export default Profile