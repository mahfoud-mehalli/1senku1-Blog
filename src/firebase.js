// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEIasmhEOcrDnE9dFix85fsFrmXTeH-j4",
  authDomain: "blog-platform-59506.firebaseapp.com",
  projectId: "blog-platform-59506",
  storageBucket: "blog-platform-59506.appspot.com",
  messagingSenderId: "623172131606",
  appId: "1:623172131606:web:13a004d677f452c8758e37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
