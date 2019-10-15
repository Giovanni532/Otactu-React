import React from 'react'
import Image from '../assets/gokuKamehaUi.png'

export const Child = ({ location }) => {
  return (
    <div className="wrapper-profil">
      <div className="image-wrapper">
      <img src={Image} alt="Goku ultra instinct" />
      </div>
        <div className="mangas-info">
          <img className="mangas-info-image" src={location.state.imageUrl} alt={location.state.nameOfManga} />
          <p className="first-p">Manga: {location.state.nameOfManga}</p>
          <p>L'auteur: {location.state.autheur}</p>
          <p>Sortie pour la premiere fois le: {location.state.dateDeSortie}</p>
          <p>Nombre de saison: {location.state.saison}</p>
          <p>Le type: {location.state.type}</p>
          <p>Description: {location.state.description}</p>
        </div>
    </div>
  );
}