import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVUAv67NlriuCVKZOw19ynMUw3tnuyHlU",
  authDomain: "amani-6301e.firebaseapp.com",
  projectId: "amani-6301e",
  storageBucket: "amani-6301e.appspot.com",
  messagingSenderId: "35107123428",
  appId: "1:35107123428:web:5e02436ed35bfdbfc13cf1",
  measurementId: "G-46PG0MEKQY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const account = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { account, db };
