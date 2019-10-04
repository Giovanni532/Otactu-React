import React from 'react'
import firebase from 'firebase/app'
import image from '../../assets/userprofile.png'

export default class CardManga extends React.Component {
    constructor() {
        super()

        this.state = {
            image: "",
            imageUrl: image,
        }
    }

    componentDidMount() {
        firebase.storage().ref('mangas/' + this.props.numberOfFolder).list()
            .then(filename => {
                if (filename.items.length !== 0) {
                    this.setState({ image: filename.items[0].name })
                    firebase.storage().ref('mangas/' + this.props.numberOfFolder + '/' + this.state.image).getDownloadURL()
                        .then(url => {
                            this.setState({ imageUrl: url })
                        })
                }
            })
    }

    render() {
        return (
            <div>
            <div className="parent-manga">
                <div className="card-manga" key={this.props.numberOfFolder}>
                    <img src={this.state.imageUrl} alt={this.props.nameOfManga} />
                    <div className="card-manga-infos">
                        <div>
                            <h2>{this.props.nameOfManga}</h2>
                            <p>{this.props.description}</p>
                        </div>
                        <h2 className="card-manga-pricing">{this.props.createAt}</h2>
                        {/* <img src="https://kitt.lewagon.com/placeholder/users/krokrob" class="card-manga-user avatar-bordered" /> */}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}