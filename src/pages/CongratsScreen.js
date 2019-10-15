import React from 'react'

const CongratsScreen = ({location}) => {
    return (
        <div>
            <p>Merci {location.state.email}</p>
            <p>Ton email a bien ete envoyer</p>
        </div>
    )
}

export default CongratsScreen