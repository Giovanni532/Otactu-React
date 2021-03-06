import React from 'react'
import firebase from 'firebase/app'
import CardManga from './CardManga'
import LoaderCircle from '../../loaders/LoaderCircle'
import Image from '../../assets/gokuUI.png'

export default class SearchBar extends React.Component {
    _isMounted = true
    constructor() {
        super();

        this.state = {
            query: "",
            mangasData: [],
            filtered: [],
            loader: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.searchBarItem = this.searchBarItem.bind(this)
    }

    searchBarItem() {
        let currentList = [];
        let newList = [];
        if (this.state.query !== "") {
            currentList = this.state.mangasData;
            newList = currentList.filter(manga => {
                const lcManga = manga.nameOfManga.toLowerCase();
                const filter = this.state.query.toLowerCase();
                return lcManga.includes(filter);
            });
        } else {
            newList = this.state.mangasData;
        }
        this.setState({
            filtered: newList
        })
    }

    handleChange = event => {
        event.preventDefault()
        const value = event.target.value
        const name = event.target.name

        this.setState({
            [name]: value
        })

        this.searchBarItem()
    }

    handleSubmit(event) {
        event.preventDefault()
        this.searchBarItem()
    }

    componentDidMount() {
        const data = firebase.database().ref('mangas')
        data.on('value', (snapshot) => {
            const manga = snapshot.val();
            const mangaData = []
            let index = 0;
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
            if (this._isMounted) {
                this.setState({
                    mangasData: mangaData,
                    loader: false
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
                <div className="manga-image">
                    <img style={{ height: 400 }} src={Image} alt="goku UI" />
                </div>
                <div className="wrap">
                    <form className="search" onSubmit={this.handleSubmit}>
                        <input
                            type="search"
                            className="searchTerm"
                            placeholder="Recherche ton manga ..."
                            value={this.state.query}
                            name="query"
                            onChange={this.handleChange}
                        />
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                {this.state.loader ?
                    <LoaderCircle />
                    :
                    this.state.query.length === 0 ?
                        <div className="parent-manga">
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
                        :
                        <div className="parent-manga">
                            {this.state.filtered.map(elem =>
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