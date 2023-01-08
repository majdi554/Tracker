import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";

const config = {

  apiKey: process.env.API_KEY, //viene de vercel. A nivel local fijarse en archivo utils
  authDomain: "expense-tracker-d7b6d.firebaseapp.com",
  databaseURL: "https://expense-tracker-d7b6d-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-d7b6d",
  storageBucket: "expense-tracker-d7b6d.appspot.com",
  messagingSenderId: "377290870016",
  appId: "1:377290870016:web:5bc038306450e72b26f7e5",
  measurementId: "G-13TJDC6C4D"  
}

const fire = firebase.initializeApp(config)

export default fire;
