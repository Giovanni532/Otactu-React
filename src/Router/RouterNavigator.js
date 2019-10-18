import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from '../helpers/PrivateRoute'
import Child from '../helpers/Child'
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NavbarLogin from '../navbar/NavbarLogin';
import Profil from '../pages/Profil';
import HomeUser from '../pages/HomeUser';
import Manga from '../pages/Manga';
import UserMangas from '../components/Profil/UserMangas';
import Contact from '../pages/Contact';
import CongratsScreen from '../pages/CongratsScreen'
import UpdateUserManga from '../components/Profil/UpdateUserManga';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';

const RouterNavigator = () => {
  return (
    <Router>
      <div>
        <NavbarLogin />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/congratsContact" component={CongratsScreen} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/home" component={HomeUser} />
        <PrivateRoute path="/users/*/mangas" component={UserMangas} />
        <PrivateRoute path="/mangas/*" component={Child} />
        <PrivateRoute path="/mangas/*/edit" component={UpdateUserManga} />
        <PrivateRoute path="/manga" component={Manga} />
        <PrivateRoute path="/profil" component={Profil} />
        <PrivateRoute path="/changePassword/*" component={ChangePassword} />
      </div>
    </Router>
  )
}

export default RouterNavigator