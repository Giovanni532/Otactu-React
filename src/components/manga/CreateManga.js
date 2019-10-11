import React from 'react'
import LoaderCircle from '../../loaders/LoaderCircle'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import UploadeImage from './UploadImage';
import Image from '../../assets/vegetoGogeta.png'

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
        if (this.state.nameOfManga.length !== 0 && this.state.description.length !== 0
            && this.state.dateDeSortie.length !== 0 && this.state.autheur.length !== 0
            && this.state.type.length !== 0) {
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
                error: "Vous n'avez pas entrer tout les champs contenant *",
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
            <div className="wrapper-profil">
                <div className="image-wrapper">
                    <img className="image-grid" src={Image} alt="vegeto gogeta profil" />
                </div>
                <div className="form-wrapper-manga">
                    <h2 className="title-profil">ajoute ton manga !</h2>
                    <form onSubmit={this.handleSubmit} className="wrapper-form-profil">
                        <UploadeImage numberOfManga={this.fetchMangasData()} />
                        <div className="grid-wrapper-manga">
                            <input
                                className="input-form-manga"
                                type="text"
                                name="nameOfManga"
                                value={this.state.nameOfManga}
                                onChange={this.handleChange}
                                placeholder="Le nom du manga*" />
                            <input
                                className="input-form-manga"
                                type="text"
                                name="autheur"
                                value={this.state.autheur}
                                onChange={this.handleChange}
                                placeholder="L'autheur du manga*" />
                            <input
                                className="input-form-manga"
                                type="text"
                                name="saison"
                                value={this.state.saison}
                                onChange={this.handleChange}
                                placeholder="Combien de saison" />
                            <input
                                className="input-form-manga"
                                type="text"
                                name="dateDeSortie"
                                value={this.state.dateDeSortie}
                                onChange={this.handleChange}
                                placeholder="Quand est-il sortie*" />
                            <select name="type" value={this.state.type} onChange={this.handleChange}>
                                <option value="Manga">Manga</option>
                                <option value="Anime">Anime</option>
                            </select>
                            <input
                                className="input-form-manga"
                                type="text"
                                name="link"
                                value={this.state.link}
                                onChange={this.handleChange}
                                placeholder="Des liens utils" />
                        </div>
                        <textarea
                            rows="4"
                            className="textarea-form-manga"
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            placeholder="La description du manga*" />
                        <input
                            className="button-logout"
                            type="submit"
                            value="Envoyer"
                        />

                    </form>
                    {this.state.loader ? <LoaderCircle /> : <p className={classNamError}>{this.state.error}</p>}
                </div>
            </div>

        )
    }
}