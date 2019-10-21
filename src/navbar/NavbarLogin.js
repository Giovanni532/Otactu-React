import React from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase'
require('firebase/auth')

export default class NavbarLogin extends React.Component {
    constructor() {
        super()

        this.state = {
            logged: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            user ? this.setState({ logged: true }) : this.setState({ logged: false })
        })
    }

    render() {
        return (
            this.state.logged ?
                <nav className="navbar navbar-dark bg-dark">
                    <div class="mx-auto" style={{ width: 200 }}>
                        <Link className="navbar-brand" to="/home">Home</Link>
                    </div>
                    <div class="mx-auto" style={{ width: 200 }}>
                        <Link className="navbar-brand" to="/manga">Manga</Link>
                    </div>
                    <div class="mx-auto" style={{ width: 200 }}>
                        <Link className="navbar-brand" to="/profil">Profil</Link>
                    </div>
                    <div class="mx-auto" style={{ width: 200 }}>
                        <Link className="navbar-brand" to="/contact">Contact</Link>
                    </div>
                </nav>
                :
                <nav className="navbar navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/login">Login</Link>
                    <Link className="navbar-brand" to="/signup">Signup</Link>
                </nav>
        )
    }
}