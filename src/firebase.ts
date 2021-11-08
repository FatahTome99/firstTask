import firebase from 'firebase/app'
import 'firebase/analytics';
import 'firebase/auth';
import "firebase/database"
import "firebase/auth" 
import "firebase/performance";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEoBb1_fnHXoJEjA-ToUSR5aanufXVn3k",
    authDomain: "first-project-19f5d.firebaseapp.com",
    projectId: "first-project-19f5d",
    storageBucket: "first-project-19f5d.appspot.com",
    messagingSenderId: "736720204279",
    appId: "1:736720204279:web:f883f28ef93a88cd0abef2",
    measurementId: "G-4T8R5QWG7D"
  };
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database().ref()
  const perf = firebase.performance();
  
  export const db = firebase.firestore();
  export const auth = firebase.auth();  
  export const firebaseAnalytics = firebase.analytics();
  export default firebase
  

  export {}