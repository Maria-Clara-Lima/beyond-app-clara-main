// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2FMWgpW2E0CrAAAlpGuVsl6wivp1fuZE",
  authDomain: "beyond-f8f3c.firebaseapp.com",
  projectId: "beyond-f8f3c",
  storageBucket: "beyond-f8f3c.appspot.com",
  messagingSenderId: "560295913044",
  appId: "1:560295913044:web:39dff83134bc4939472fc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export { auth, signInWithEmailAndPassword };