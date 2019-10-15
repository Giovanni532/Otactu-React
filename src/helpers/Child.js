import React from 'react'

export const Child = ({ location }) => {
  return (
    <div className="mangas-info">
      <img src={location.state.imageUrl} alt={location.state.nameOfManga}/>
      <p>Manga: {location.state.nameOfManga}</p>
      <p>L'auteur: {location.state.autheur}</p>
      <p>Sortie pour la premiere fois le: {location.state.dateDeSortie}</p>
      <p>Nombre de saison: {location.state.saison}</p>
      <p>Le type: {location.state.type}</p>
      <p>Description: {location.state.description}</p>
    </div>
  );
}