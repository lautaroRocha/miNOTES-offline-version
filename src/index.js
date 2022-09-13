import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBcax84gtMtmxqWVaWuXku9o454nLKdIqU",
  authDomain: "minote-offline.firebaseapp.com",
  projectId: "minote-offline",
  storageBucket: "minote-offline.appspot.com",
  messagingSenderId: "1001880281920",
  appId: "1:1001880281920:web:7aa99444257efbbbc710a5"
};

const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
