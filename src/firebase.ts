// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0qowW364KkEJc05-KU6mNEwskzlLoSA8",
  authDomain: "tweet-clone-e3ae3.firebaseapp.com",
  projectId: "tweet-clone-e3ae3",
  storageBucket: "tweet-clone-e3ae3.appspot.com",
  messagingSenderId: "383819149869",
  appId: "1:383819149869:web:43787076149ece1f33bea4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
