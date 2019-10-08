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
        this.setState({ loaded: true })
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
                    dateDeSortie: manga[name].dateDeSortie,
                    autheur: manga[name].autheur,
                    saison: manga[name].saison,
                    type: manga[name].type,
                    link: manga[name].link
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
                    <LoaderCircle />
                    :
                    <div className="parent-manga">
                        {this.state.mangasData.slice(-3).map(elem =>
                            <CardManga
                                key={elem.id}
                                numberOfFolder={elem.id}
                                nameOfManga={elem.nameOfManga}
                                dateDeSortie={elem.dateDeSortie}
                                description={elem.description}
                                link={elem.link}
                                autheur={elem.autheur}
                                saison={elem.saison}
                                type={elem.type}
                            />
                        )}
                    </div>
                }
            </div>
        )
    }
}