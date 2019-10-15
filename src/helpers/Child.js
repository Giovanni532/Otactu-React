import React from 'react'
import Image from '../assets/gokuKamehaUi.png'

export const Child = ({ location }) => {
  return (
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
          <p className="manga-info">Le type: {location.state.type}</p>
          <p className="last-manga-info">Description: {location.state.description}</p>
        </div>
    </div>
  );
}