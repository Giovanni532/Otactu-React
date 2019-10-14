import React from 'react'
import { Redirect } from 'react-router-dom'
import LoaderCircle from '../loaders/LoaderCircle'
import Image from '../assets/gokuGod.png'

export default class Contact extends React.Component {
    constructor() {
        super()

        this.state = {
            email: "",
            subject: "",
            message: "",
            error: "",
            loader: false,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        this.submitEmail()
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
            <div className="wrapper-profil">
                <div className="image-wrapper">
                    <img src={Image} alt="vegeto gogeta profil" style={{ height: 500 }} />
                </div>
                <div style={{marginTop: 100}} className="account-wrapper">
                    <h2 className="title-profil">Contactez-nous</h2>
                    <form onSubmit={this.handleSubmit} className="wrapper-form-profil">
                        <input className="input-form-profil" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        <input className="input-form-profil" type="text" name="subject" value={this.state.subject} onChange={this.handleChange} />
                        <input className="input-form-profil" type="text" name="message" value={this.state.message} onChange={this.handleChange} />
                        <input className="button-logout" type="submit" value="Envoyer" />
                    </form>
                    {this.state.loader ? <LoaderCircle /> : <p className={classNamError}>{this.state.error}</p>}
                </div>
            </div>
        )
    }
}