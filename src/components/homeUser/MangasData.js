import React from 'react'
import firebase from 'firebase/app'
import Image from '../../assets/userprofile.png'

export default class MangasData extends React.Component {
    constructor() {
        super();

        this.state = {
            mangasData: []
        }
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
            this.setState({
                mangasData: mangaData
            })
        })

    }

    render() {
        return (
            <div>
                {this.state.mangasData.map((elem, index) =>
                    <div className="card-manga" key={index}>
                        <img src={Image} alt={elem.nameOfManga}/>
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
        )
    }
}