import React from 'react'
import firebase from 'firebase/app'
import image from '../../assets/userprofile.png'
import { Redirect } from 'react-router-dom'

export default class CardManga extends React.Component {
    constructor() {
        super()

        this.state = {
            image: "",
            imageUrl: image,
            redirect: false
        }
    }

    componentDidMount() {
        firebase.storage().ref('mangas/' + this.props.numberOfFolder).list()
            .then(filename => {
                if (filename.items.length !== 0) {
                    this.setState({ image: filename.items[0].name })
                    firebase.storage().ref('mangas/' + this.props.numberOfFolder + '/' + this.state.image).getDownloadURL()
                        .then(url => {
                            this.setState({ imageUrl: url })
                        })
                }
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/mangas/' + this.props.nameOfManga,
                state: {
                    numberOfFolder: this.props.numberOfFolder,
                    nameOfManga: this.props.nameOfManga,
                    imageUrl: this.state.imageUrl,
                    description: this.props.description,
                    dateDeSortie: this.props.dateDeSortie,
                    autheur: this.props.autheur,
                    type: this.props.type,
                    saison: this.props.saison,
                    link: this.props.link,
                    creePar: this.props.creePar
                }
            }} />;
        }
        return (
            <div className="card-manga" key={this.props.numberOfFolder} onClick={() => this.setState({ redirect: !this.state.redirect })}>
                <img src={this.state.imageUrl} alt={this.props.nameOfManga} />
                <div className="card-manga-infos">
                    <div>
                        <h2>{this.props.nameOfManga}</h2>
                        <p>{this.props.autheur}</p>
                    </div>
                    <h2 className="card-manga-pricing">{this.props.dateDeSortie}</h2>
                </div>
            </div>
        )
    }
}