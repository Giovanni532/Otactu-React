import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from './helpers/PrivateRoute'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavbarLogin from './navbar/NavbarLogin';
import Profil from './pages/Profil';
import HomeUser from './pages/HomeUser';
import Manga from './pages/Manga';

const configFirebase = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

firebase.initializeApp(configFirebase)

function App() {
  return (
    <Router>
      <div>
        <NavbarLogin />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute path="/home" component={HomeUser} />
        <PrivateRoute path="/manga" component={Manga} />
        <PrivateRoute path="/user" component={Profil} />
      </div>
    </Router>
  );
}

export default App;
