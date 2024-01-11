// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASKblLpuAswbhr8N8OQWJua3I9LopSRB0",
  authDomain: "twitter-x-clone-deacd.firebaseapp.com",
  projectId: "twitter-x-clone-deacd",
  storageBucket: "twitter-x-clone-deacd.appspot.com",
  messagingSenderId: "756497229755",
  appId: "1:756497229755:web:ed81a78dd31a63c5f9069e",
  measurementId: "G-W7KQ7FJEM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
//const analytics = getAnalytics(app);