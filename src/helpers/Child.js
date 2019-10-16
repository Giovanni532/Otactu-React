import React from 'react'
import Image from '../assets/gokuKamehaUi.png'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'

export const Child = ({ location }) => {

  const uid = firebase.auth().currentUser.uid

  const [redirect, setRedirect] = React.useState(false)

  return (
    redirect ?
      <Redirect to={{
        pathname: '/mangas/' + location.state.nameOfManga + '/edit',
        state: {
          id: location.state.numberOfFolder,
          nameOfManga: location.state.nameOfManga,
          dateDeSortie: location.state.dateDeSortie,
          description: location.state.description,
          link: location.state.link,
          autheur: location.state.autheur,
          saison: location.state.saison,
          type: location.state.type,
          creePar: location.state.creePar
        }
      }} />
      :
      <div className="wrapper-manga">
        <div className="image-wrapper">
          <img src={Image} alt="Goku ultra instinct" />
        </div>
        <div className="show-wrapper">
          <img className="mangas-info-image" src={location.state.imageUrl} alt={location.state.nameOfManga} />
          <p className="manga-info">Manga: {location.state.nameOfManga}</p>
          <p className="manga-info">L'auteur: {location.state.autheur}</p>
          <p className="manga-info">Sortie pour la premiere fois le: {location.state.dateDeSortie}</p>
          <p className="manga-info">Nombre de saison: {location.state.saison}</p>
          <p className="last-manga-info">Le type: {location.state.type}</p>
          {/* <p className="last-manga-info">Description:</p> */}
          {/* <div className="desc-manga">
          <p>{location.state.description}</p>
          </div> */}
          {location.state.creePar === uid ?
            <div>
              <button onClick={setRedirect(true)}>editez les informations du mangas</button>
            </div>
            :
            null
          }
        </div>
      </div>
  );
}