import React from 'react'
import firebase from 'firebase/app'
import { Redirect, Link } from 'react-router-dom'
import LoaderCircle from '../loaders/LoaderCircle'
import Image from '../assets/gokuBack.png'

export default class Signup extends React.Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            redirect: false,
            error: "",
            loader: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    signupOnPress = () => {
        this.setState({ loader: true })
        const { email, password, confirmPassword } = this.state
        if (password === confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const uid = firebase.auth().currentUser.uid
                    if (uid) {
                        firebase.database().ref('user/' + uid).set({
                            email: this.state.email,
                            firstName: "",
                            lastName: "",
                        })
                    }
                    this.setState({ redirect: true })
                })
                .catch(() => {
                    this.setState({ loader: false, error: "Email deja enregistrer veuillez vous connectez" })
                })
        } else {
            this.setState({ loader: false, error: "vos mot de passe ne correspondent pas" })
        }
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.signupOnPress()
    }

    render() {
        let classNamError = ""
        if (this.state.error.length > 0) {
            classNamError = "error"
        }
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home' />;
        }
        return (
            <div className="wrapper-form">
                <div>
                    <img src={Image} className="image-form-signup" alt="goku de dos" />
                </div>
                <form onSubmit={this.handleSubmit} className="form">
                    <input
                        className="input-form"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Votre email" />
                    <input
                        className="input-form"
                        type="text" name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Votre mot de passe" />
                    <input
                        className="input-form"
                        type="text" name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        placeholder="Confirmer votre mot de passe" />
                    <input className="button-form" type="submit" value="S'inscrire" />
                </form>
                {this.state.loader ? <LoaderCircle /> : <p className={classNamError}>{this.state.error}</p>}
                <p className="title-signup">Tu as déjà un compte ? <Link className="link" to="/login">connecte toi</Link></p>
            </div>
        )
    }
}