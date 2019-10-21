import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app'
import RouterNavigator from './Router/RouterNavigator'
import useWindowDimensions from './helpers/UseWindowDimensions';


const configFirebase = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

firebase.initializeApp(configFirebase)

function App() {
  const {width} = useWindowDimensions();
  return (
    width <= 700 ?
    <div>
      <p>Ce site web n'as pas été conçue pour une version mobile mais tu peux telecharger l'app</p>
    </div>
    :
    <RouterNavigator/>
  )
}

export default App;
