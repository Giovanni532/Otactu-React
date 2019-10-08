import React from 'react'
import LoaderCircle from '../../loaders/LoaderCircle'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import UploadeImage from './UploadImage';

export default class CreateManga extends React.Component {
    constructor() {
        super();

        this.state = {
            nameOfManga: "",
            autheur: "",
            saison: "",
            link: "",
            description: "",
            dateDeSortie: "",
            uid: firebase.auth().currentUser.uid,
            type: "Anime",
            error: "",
            loader: false,
            redirect: false,
        }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    fetchMangasData = () => {
        let lengthData = 0
        const data = firebase.database().ref('mangas')
        data.on('value', (snapshot) => {
            const manga = snapshot.val();
            const mangaData = []
            let index = 0
            for (let name in manga) {
                mangaData.push({
                    nameOfManga: manga[name].nameOfManga,
                    description: manga[name].description,
                    dateDeSortie: manga[name].dateDeSortie
                })
                index++;
            }
            lengthData = index
        })
        return lengthData
    }

    createManga = () => {
        this.setState({ loader: true })
        if (this.state.nameOfManga.length !== 0 && this.state.description.length !== 0 && this.state.dateDeSortie.length !== 0) {
            firebase.database().ref('mangas/' + this.fetchMangasData()).set({
                nameOfManga: this.state.nameOfManga,
                description: this.state.description,
                dateDeSortie: this.state.dateDeSortie,
                autheur: this.state.autheur,
                saison: this.state.saison,
                link: this.state.link,
                creePar: this.state.uid,
                type: this.state.type
            })
                .then(() => {
                    this.setState({ loader: false, redirect: true })
                })
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
        if (this.state.redirect) {
            return <Redirect to='/home' />;
        }
        return (
            <div className="parent-form">
                <h2 className="title">ajoute ton manga !</h2>
                <form onSubmit={this.handleSubmit} className="form">
                    <p>L'image du manga</p>
                    <UploadeImage numberOfManga={this.fetchMangasData()}/>
                    <label className="label">
                        le nom du mangas
                        </label>
                    <input className="input" type="text" name="nameOfManga" value={this.state.nameOfManga} onChange={this.handleChange} />
                    <label className="label">
                        l'autheur
                        </label>
                    <input className="input" type="text" name="autheur" value={this.state.autheur} onChange={this.handleChange} />
                    <label className="label">
                        combien de saison
                        </label>
                    <input className="input" type="text" name="saison" value={this.state.saison} onChange={this.handleChange} />
                    <label className="label">
                        la description
                        </label>
                    <input className="input" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <label className="label">
                        Date de sortie
                        </label>
                    <input className="input" type="text" name="dateDeSortie" value={this.state.dateDeSortie} onChange={this.handleChange} />
                    <label className="label">
                        quelle type
                        </label>
                    <select name="type" value={this.state.type} onChange={this.handleChange}>
                        <option value="Manga">Manga</option>
                        <option value="Anime">Anime</option>
                    </select>
                    <label className="label">
                        lien util
                        </label>
                    <input className="input" type="text" name="link" value={this.state.link} onChange={this.handleChange} />
                    <input className="button" type="submit" value="Envoyer" />
                </form>
                {this.state.loader ? <LoaderCircle /> : <p className={classNamError}>{this.state.error}</p>}
            </div>
        )
    }
}