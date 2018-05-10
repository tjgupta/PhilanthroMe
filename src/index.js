import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "philanthrome-8bcf4.firebaseapp.com",
  databaseURL: "https://philanthrome-8bcf4.firebaseio.com",
  projectId: "philanthrome-8bcf4",
  storageBucket: "philanthrome-8bcf4.appspot.com",
  messagingSenderId: "634623017252"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'));
registerServiceWorker();
