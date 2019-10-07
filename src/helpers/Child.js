import React from 'react'

export const Child = ({ match }) => {
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    );
  }