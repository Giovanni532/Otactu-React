import React from 'react'
import firebase from 'firebase/app'

export default class MangasData extends React.Component {
    constructor() {
        super();

        this.state = {
            mangasData: []
        }
    }

    componentWillMount() {
        const data = firebase.database().ref('mangas')
        data.on('value', (snapshot) => {
            const manga = snapshot.val();
            const mangaData = []
            for (let name in manga) {
                mangaData.push({
                    nameOfManga: manga["nameOfManga"],
                    description: manga["description"],
                    createAt: manga["createAt"]
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
                    <div key={index}>
                        {elem.description}
                    </div>
                )}
            </div>
        )
    }
}