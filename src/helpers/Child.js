import React from 'react'

export const Child = ({ location }) => {
  return (
    <div className="mangas-info">
      <img src={location.state.imageUrl} alt={location.state.nameOfManga}/>
      <p>Manga: {location.state.nameOfManga}</p>
      <p>L'auteur: {location.state.autheur}</p>
      <p>Sortie pour la premiere fois le: {location.state.dateDeSortie}</p>
    </div>
  );
}