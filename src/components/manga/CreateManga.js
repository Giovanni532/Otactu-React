import React from 'react'
import LoaderCircle from '../../loaders/LoaderCircle'
import firebase from 'firebase/app'

export default class CreateManga extends React.Component {
    constructor() {
        super();

        this.state = {
            nameOfManga: "",
            description: "",
            createAt: "",
            uid: firebase.auth().currentUser.uid,
            error: "",
            loader: false
        }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    createManga = () => {
        this.setState({loader: true})
        if (this.state.nameOfManga.length !== 0 && this.state.description.length !== 0 && this.state.createAt.length !== 0) {
            if (this.state.createAt) {
                this.setState({
                    error: "Ce manga est deja dans la bdd"
                })
            } else {
                firebase.database().ref('mangas/').child(this.state.nameOfManga).set({
                    nameOfManga: this.state.nameOfManga,
                    description: this.state.description,
                    createAt: this.state.createAt,
                    creePar: this.state.uid
                })
                .then(() => {
                    this.setState({loader: false})
                })
            }
        } else {
            this.setState({
                error: "Vous n'avez pas entrer tout les champs",
                loader: false
            })
        }
    }

    handleChange = event => {
        const value = event.target.value
        const name = event.target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.createManga()
    }

    render() {
        let classNamError = ""
        if (this.state.error.length > 0) {
            classNamError = "error"
        }

        return(
            <div className="parent-form">
                <h2 className="title">ajoute ton manga !</h2>
                <form onSubmit={this.handleSubmit} className="form">
                    <label className="label">
                        le nom du mangas
                        </label>
                    <input className="input" type="text" name="nameOfManga" value={this.state.nameOfManga} onChange={this.handleChange} />
                    <label className="label">
                        la description
                        </label>
                    <input className="input" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <label className="label">
                        quand il a ete cree
                        </label>
                    <input className="input" type="text" name="createAt" value={this.state.createAt} onChange={this.handleChange} />
                    <input className="button" type="submit" value="Envoyer" />
                </form>
                {this.state.loader ? <LoaderCircle /> : <p className={classNamError}>{this.state.error}</p>}
            </div>
        )
    }
}