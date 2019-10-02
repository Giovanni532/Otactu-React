import React from 'react'
import firebase from 'firebase/app'
import Image from '../../assets/userprofile.png'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

export default class SearchBar extends React.Component {
    _isMounted = true
    constructor() {
        super();

        this.state = {
            query: "",
            mangasData: [],
            filtered: [],
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
                <InputGroup className="mb-3" onSubmit={this.handleSubmit}>
                    <FormControl
                        placeholder="Recherche ton manga"
                        type="text"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                    <InputGroup.Prepend>
                        <Button onSubmit={this.handleSubmit}>Rechercher</Button>
                    </InputGroup.Prepend>
                </InputGroup>
                {this.state.query.length === 0 ?
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
                        )}
                    </div>
                    :
                    <div className="parent-manga">
                        {this.state.filtered.map((elem, index) =>
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
                        )}
                    </div>
                }
            </div>
        )
    }
}