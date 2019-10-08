import React from 'react'

export const Child = ({ location }) => {
  return (
    <div className="card-manga" key={location.state.numberOfFolder}>
      <img src={location.state.imageUrl} alt={location.state.nameOfManga} />
      <div className="card-manga-infos">
        <div>
          <h2>{location.state.nameOfManga}</h2>
          <p>{location.state.autheur}</p>
        </div>
        <h2 className="card-manga-pricing">{location.state.createAt}</h2>
      </div>
    </div>
  );
}