import React from 'react'
import firebase from 'firebase/app'
import LoaderCircle from '../../loaders/LoaderCircle'
import CardManga from '../homeUser/CardManga'

export default class UserMangas extends React.Component {
    _isMounted = true
    constructor() {
        super()

        this.state = {
            mangasData: [],
            loaded: true
        }
    }


    componentDidMount() {
        const { uid } = this.props.location.state
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
                    link: manga[name].link,
                    creePar: manga[name].creePar
                })
                index++;
            }
            const mangasUser = mangaData.filter(elem => uid.includes(elem.creePar))
            if (this._isMounted) {
                this.setState({
                    mangasData: mangasUser,
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
                <h2 style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: 20, marginBottom: -20 }}>Vos mangas</h2>
                {this.state.loader === true ?
                    <LoaderCircle />
                    :
                    <div className="wrapper-manga">
                        {this.state.mangasData.map(elem =>
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
                                creePar={elem.creePar}
                            />
                        )}
                    </div>
                }
            </div>
        )
    }
}