import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Image from '../assets/gokuKamehaUi.png'

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            success: false,
            error: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    resetPassword = email => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(user => {
                this.setState({ success: true })
            })
            .catch(() => {
                this.setState({ error: "votre email n'est pas dans la base de donnees" })
            })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.resetPassword(this.state.email)
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
                        <p>Nous vous avons envoye un lien par email</p>
                        <Link to='/login'> se connecter </Link>
                    </div>
                    :
                    <div style={{marginTop: 50}}>
                        <form onSubmit={this.handleSubmit} className="form">
                            <input
                                className="input-form-change"
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                                placeholder="Votre email" />
                            <input className="button-edit-manga" type="submit" value="Envoyer" />
                        </form>
                        <p className={classNamError}>{this.state.error}</p>
                    </div>
                }
            </div>
        )
    }
}