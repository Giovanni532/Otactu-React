import React from 'react'
import firebase from 'firebase/app'
import Image from '../../assets/userprofile.png'

export default class SearchBar extends React.Component {
    _isMounted = true
    constructor() {
        super();

        this.state = {
            query: "",
            mangasData: [],
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.searchBarItem = this.searchBarItem.bind(this)
    }

    searchBarItem() {
        let listFiltered = []

        if (this.state.query !== "") {
            listFiltered = this.state.mangasData.filter(elem => elem.nameOfManga.toLowerCase() === this.state.query.toLowerCase())
            this.setState({ filtered: listFiltered })
        } else {
            return this.state.mangasData
        }
    }

    handleChange = event => {
        const value = event.target.value
        const name = event.target.name

        this.setState({
            [name]: value
        })
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
                <form onSubmit={this.handleSubmit} className="form">
                    <label className="label">
                        searchbar
                        </label>
                    <input className="input" type="text" name="query" value={this.state.query} onChange={this.handleChange} />
                    <input className="button" type="submit" value="Envoyer" />
                </form>
                {this.state.filtered.length === 0 ?
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