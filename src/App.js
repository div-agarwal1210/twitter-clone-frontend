import './App.css';
import {BrowserRouter , Route ,Routes} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading/PageLoading';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Notification from './pages/Notification/Notification'
import Messages from './pages/Messages/Messages'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import List from './pages/List/List'
import Profile from './pages/Profile/Profile'
import More from './pages/More/More'
import VerificationBadge from './pages/VerificationBadge/VerificationBadge';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route index element={<Feed/>}/>
            <Route path='/badge' element={<VerificationBadge/>}/>
          </Route>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route path='feed' element={<Feed/>} />
            <Route path='explore' element={<Explore/>}/>
            <Route path='notifications' element={<Notification/>}/>
            <Route path='messages' element={<Messages/>}/>
            <Route path='bookmarks' element={<Bookmarks/>}/>
            <Route path='lists' element={<List/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='more' element={<More/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/page-loading' element={<PageLoading/>} />
          
        </Routes>
      </BrowserRouter>
          </div>
  );
}

export default App;
