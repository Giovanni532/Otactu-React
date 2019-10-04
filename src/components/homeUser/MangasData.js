import React from 'react'
import firebase from 'firebase/app'
import LoaderCircle from '../../loaders/LoaderCircle'
import CardManga from './CardManga'

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
            let index = 0
            for (let name in manga) {
                mangaData.push({
                    id: index,
                    nameOfManga: manga[name].nameOfManga,
                    description: manga[name].description,
                    createAt: manga[name].createAt,
                })
                index++;
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
        return (
            <div>
                <h2 className="title-mangas">Voici les 3 derniers mangas ajoutez !</h2>
                {this.state.loaded ? 
                    <LoaderCircle/>
                    :
                    this.state.mangasData.map(elem => 
                        <CardManga key={elem.id} numberOfFolder={elem.id} nameOfManga={elem.nameOfManga} createAt={elem.createAt} description={elem.description}/>
                    ).reverse().slice(-3)
                }
                </div>
        )
    }
}