import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);
export const db = getFirestore(app);
