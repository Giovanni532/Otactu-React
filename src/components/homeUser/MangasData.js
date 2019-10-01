import React from 'react'
import firebase from 'firebase/app'
import Image from '../../assets/userprofile.png'
import LoaderCircle from '../../loaders/LoaderCircle'

export default class MangasData extends React.Component {
    _isMounted = true
    constructor() {
        super();

        this.state = {
            mangasData: [],
            loaded: true
        }
    }

    componentDidMount() {
        this.setState({loaded: true})
        const data = firebase.database().ref('mangas')
        data.on('value', (snapshot) => {
            const manga = snapshot.val();
            const mangaData = []
            for (let name in manga) {
                mangaData.push({
                    nameOfManga: manga[name].nameOfManga,
                    description: manga[name].description,
                    createAt: manga[name].createAt
                })
            }
            if (this._isMounted) {
                this.setState({
                    mangasData: mangaData,
                    loaded: false
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const dataLength = this.state.mangasData.length
        return (
            <div>
                <h2 className="title-mangas">Voici les 3 derniers mangas ajoutez !</h2>
                {this.state.loaded ? 
                    <LoaderCircle/>
                    :
                    <div className="parent-manga">
                    {this.state.mangasData.map((elem, index) =>
                        <div className="card-manga" key={index}>
                            <img src={Image} alt={elem.nameOfManga} />
                            <div className="card-manga-infos">
                                <div>
                                    <h2>{elem.nameOfManga}</h2>
                                    <p>{elem.description}</p>
                                </div>
                                <h2 className="card-manga-pricing">{elem.createAt}</h2>
                                {/* <img src="https://kitt.lewagon.com/placeholder/users/krokrob" class="card-manga-user avatar-bordered" /> */}
                            </div>
                        </div>
                    ).slice(dataLength - 3, dataLength)}
                </div>
                }
                </div>
        )
    }
}