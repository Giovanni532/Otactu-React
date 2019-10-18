import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Image from '../assets/gokuKamehaUi.png'

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            success: false,
            error: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    reauthenticate = (currentPassword) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword).then(() => {
            let user = firebase.auth().currentUser;
            user.updatePassword(newPassword)
                .then(() => {
                    this.setState({ success: true })
                })
                .catch(() => { this.setState({ error: "Votre nouveau mot de passe est pas assez long" }) })
        })
        .catch(() => { this.setState({ error: "Vous n'avez pas remplis les champs ou ancien mot de passe invalide" }) })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.changePassword(this.state.currentPassword, this.state.newPassword)
    }

    render() {
        let classNamError = ""
        if (this.state.error.length > 0) {
            classNamError = "error"
        }
        return (
            <div className="wrapper-form">
                <div>
                    <img src={Image} className="image-form" alt="goku de face" />
                </div>
                {this.state.success ?
                    <div>
                        <p>Votre mot de passe a bien ete modifier</p>
                        <Link to='/profil'>profil</Link>
                    </div>
                    :
                    <div style={{marginTop: 50}}>
                        <form onSubmit={this.handleSubmit} className="form">
                            <input
                                className="input-form-change"
                                type="password"
                                name="currentPassword"
                                value={this.state.currentPassword}
                                onChange={e => this.setState({ currentPassword: e.target.value })}
                                placeholder="Votre ancien mot de passe" />
                                <input
                                className="input-form-change"
                                type="password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={e => this.setState({ newPassword: e.target.value })}
                                placeholder="Votre nouveau mot de passe" />
                            <input className="button-edit-manga" type="submit" value="Envoyer" />
                        </form>
                        <p className={classNamError}>{this.state.error}</p>
                    </div>
                }
            </div>
        )
    }
}