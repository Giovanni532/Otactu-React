import React from 'react'
import firebase from 'firebase/app'
import Image from '../../assets/vegetoGogeta.png'
import { Redirect } from 'react-router-dom'

export default class UpdateUserManga extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state.id,
            nameOfManga: this.props.location.state.nameOfManga,
            dateDeSortie: this.props.location.state.dateDeSortie,
            description: this.props.location.state.description,
            link: this.props.location.state.link,
            autheur: this.props.location.state.autheur,
            saison: this.props.location.state.saison,
            type: this.props.location.state.type,
            creePar: this.props.location.state.creePar,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        firebase.database().ref('mangas/' + this.state.id).update({
            nameOfManga: this.state.nameOfManga,
            dateDeSortie: this.state.dateDeSortie,
            description: this.state.description,
            link: this.state.link,
            autheur: this.state.autheur,
            saison: this.state.saison,
            type: this.state.type,
            creePar: this.state.creePar
        })
        .then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
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
                            value="Changer les informations"
                        />
                    </form>
                </div>
            </div>
        )
    }
}