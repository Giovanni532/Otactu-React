import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from '../helpers/PrivateRoute'
import { Child } from '../helpers/Child'
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NavbarLogin from '../navbar/NavbarLogin';
import Profil from '../pages/Profil';
import HomeUser from '../pages/HomeUser';
import Manga from '../pages/Manga';
import UserMangas from '../components/Profil/UserMangas';
import Contact from '../pages/Contact';

const RouterNavigator = () => {
  return (
    <Router>
      <div>
        <NavbarLogin />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/contact" component={Contact} />
        <PrivateRoute path="/home" component={HomeUser} />
        <PrivateRoute path="/users/*/mangas" component={UserMangas} />
        <PrivateRoute path="/mangas/*" component={Child} />
        <PrivateRoute path="/manga" component={Manga} />
        <PrivateRoute path="/profil" component={Profil} />
      </div>
    </Router>
  )
}

export default RouterNavigator