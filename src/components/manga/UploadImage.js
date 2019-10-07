import React from 'react'
import firebase from 'firebase/app'
import FileUploader from 'react-firebase-file-uploader'

export default class UploadeImage extends React.Component {
    constructor() {
        super();
        this.state = {
            image: '',
            imageUrl: '',
            progress: 0
        }
    }

    handleUploadStart = () => {
        this.setState({ progress: 0 })
    }

    fileOnProgress = progress => {
        this.setState({ progress: progress })
    }

    handleUploadSucces = filename => {
        if (this.state.image !== filename) {
            this.setState({
                image: filename,
                progress: 100
            })
        }

        firebase.storage().ref('mangas/' + this.props.numberOfManga).child(filename).getDownloadURL()
            .then(url => this.setState({
                imageUrl: url
            }))
    }

    render() {
        return (
            <FileUploader
                accept="image/*"
                name="image"
                onUploadStart={this.handleUploadStart}
                storageRef={firebase.storage().ref('mangas/' + this.props.numberOfManga)}
                onUploadSuccess={this.handleUploadSucces}
                onProgress={this.fileOnProgress}
            />
        )
    }
}