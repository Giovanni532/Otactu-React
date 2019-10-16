import React from 'react'
import Image from '../assets/gokuKamehaUi.png'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'

export default class Child extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: firebase.auth().currentUser.uid,
      redirect: false
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/mangas/' + this.props.location.state.nameOfManga + '/edit',
        state: {
          id: this.props.location.state.numberOfFolder,
          nameOfManga: this.props.location.state.nameOfManga,
          description: this.props.location.state.description,
          dateDeSortie: this.props.location.state.dateDeSortie,
          autheur: this.props.location.state.autheur,
          type: this.props.location.state.type,
          saison: this.props.location.state.saison,
          link: this.props.location.state.link,
          creePar: this.props.location.state.creePar
        }
      }} />;
    }
    return (
      <div className="wrapper-manga" >
        <div className="image-wrapper">
          <img src={Image} alt="Goku ultra instinct" />
        </div>
        <div className="show-wrapper">
          <img className="mangas-info-image" src={this.props.location.state.imageUrl} alt={this.props.location.state.nameOfManga} />
          <p className="manga-info">Manga: {this.props.location.state.nameOfManga}</p>
          <p className="manga-info">L'auteur: {this.props.location.state.autheur}</p>
          <p className="manga-info">Sortie pour la premiere fois le: {this.props.location.state.dateDeSortie}</p>
          <p className="manga-info">Nombre de saison: {this.props.location.state.saison}</p>
          <p className="last-manga-info">Le type: {this.props.location.state.type}</p>
          {/* <p className="last-manga-info">Description:</p> */}
          {/* <div className="desc-manga">
          <p>{this.props.location.state.description}</p>
          </div> */}
          {this.props.location.state.creePar === this.state.uid ?
            <button className="button-edit-manga" onClick={() => this.setState({ redirect: true })}>Editez les informations du mangas</button>
            :
            null
          }
        </div>
      </div>
    )
  }
}