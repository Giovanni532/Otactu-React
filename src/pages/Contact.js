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
            <div className="wrapper-form">
                <div>
                    <img style={{height: 350}} src={Image} className="image-form" alt="goku super sayan god" />
                </div>
                <form onSubmit={this.handleSubmit} className="form-manga">
                    <input
                        className="input-form-contact"
                        type="text"
                        name="Votre email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Votre email" />
                    <input
                        className="input-form-contact"
                        type="text" name="subject"
                        value={this.state.subject}
                        onChange={this.handleChange}
                        placeholder="Le sujet" />
                                            <input
                        className="input-form-contact"
                        type="text" name="message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        placeholder="Votre message" />
                    <input className="button-contact" type="submit" value="Envoyer" />
                </form>
                {this.state.loader ? <LoaderCircle /> : <p className={classNamError}>{this.state.error}</p>}
            </div>
        )
    }
}