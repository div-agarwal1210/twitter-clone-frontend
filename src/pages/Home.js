import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Feed from './Feed/Feed'
import Widgets from './Widgets/Widgets'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import auth from '../firebase.init'
import { Outlet } from 'react-router-dom'
import UseLoggedInUser from '../Hooks/UseLoggedInUser'

function Home() {
  const user  = useAuthState(auth)
  const handleLogout = ()=>{
      signOut(auth)
  }
  return (
    <div className='app'>
      <Sidebar handleLogout={handleLogout} user={user}/>
      {/* <Feed/> */}
      <Outlet/>
      <Widgets/>
    </div>
  )
}

export default Home