import React from 'react'
import {Link} from 'react-router-dom'
import Image from '../assets/gokuGod.png'


const CongratsScreen = ({ location }) => {
    return (
        <div className="wrapper-form">
            <div>
                <img style={{ height: 350 }} src={Image} className="image-form" alt="goku super sayan god" />
            </div>
            <div className="congrats">
                <p>Merci {location.state.email}, ton email a bien ete envoyer !</p>
                <Link className="link-congrats" to='/home'>Retour</Link>
            </div>
        </div>
    )
}

export default CongratsScreen