import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
import 'firebase/firestore'
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvzMQV198fQVrkgJDt9Lwzbnh0tMq51o0",
    authDomain: "react-notes-firebase-be020.firebaseapp.com",
    projectId: "react-notes-firebase-be020",
    storageBucket: "react-notes-firebase-be020.appspot.com",
    messagingSenderId: "474318907962",
    appId: "1:474318907962:web:8dd5d51d5fb2ebeaffa303",
    measurementId: "G-BZK633BZ63"
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebase);
  export const database = getDatabase(firebase);
 

  export default firebase