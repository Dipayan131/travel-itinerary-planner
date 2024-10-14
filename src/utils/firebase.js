// Import the functions you need from the Firebase SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5n_dEYKkUjkkkvqwOk4XRGKPQDILdL4E",
  authDomain: "travel-itinerary-planner-8587c.firebaseapp.com",
  databaseURL: "https://travel-itinerary-planner-8587c-default-rtdb.firebaseio.com",
  projectId: "travel-itinerary-planner-8587c",
  storageBucket: "travel-itinerary-planner-8587c.appspot.com",
  messagingSenderId: "1015021313046",
  appId: "1:1015021313046:web:4e0cfac19ad8395ff4a937",
  measurementId: "G-9H4E9L2H5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
