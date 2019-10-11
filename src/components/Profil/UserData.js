import React from 'react'
import firebase from 'firebase/app'
import { Redirect, Link } from 'react-router-dom'
import LoaderCircle from '../../loaders/LoaderCircle'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton'
import Image from '../../assets/vegetoGogetaForCreateManga.png'

export default class UserData extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: firebase.auth().currentUser.email,
            firstName: "",
            lastName: "",
            edited: true,
            redirect: false,
            loaded: false,
            image: '',
            imageUrl: Image,
            progress: 0,
            uid: firebase.auth().currentUser.uid
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    fetchUserData = async () => {
        firebase.storage().ref('avatars/' + this.state.uid).list()
            .then(filename => {
                if (filename.items.length !== 0) {
                    this.setState({ image: filename.items[0].name })
                    firebase.storage().ref('avatars/' + this.state.uid + '/' + this.state.image).getDownloadURL()
                        .then(url => {
                            this.setState({ imageUrl: url })
                        })
                }
            })

        firebase.database().ref('user/' + this.state.uid).on('value', (snapshot) => {
            let user = snapshot.val()
            this.setState({
                firstName: user['firstName'],
                lastName: user['lastName']
            })
        })
    }

    handleUploadStart = () => {
        this.setState({ progress: 0 })
    }

    fileOnProgress = progress => {
        this.setState({ progress: progress })
    }

    handleUploadSucces = filename => {
        let deleteImage = this.state.image
        if (this.state.image !== filename) {
            this.setState({
                image: filename,
                progress: 100
            })
            firebase.storage().ref('avatars/' + this.state.uid).child(deleteImage).delete()
        }

        firebase.storage().ref('avatars/' + this.state.uid).child(filename).getDownloadURL()
            .then(url => this.setState({
                imageUrl: url
            }))
    }


    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    updateData = () => {
        this.setState({ loaded: true })
        firebase.database().ref('user/' + this.state.uid).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
        this.setState({
            edited: true, loaded: false
        })
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.updateData()
    }

    UNSAFE_componentWillMount() {
        this.fetchUserData()
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <div className="wrapper-profil">
                <div className="image-wrapper">
                    <img className="image-grid" src={Image} alt="vegeto gogeta profil" />
                </div>
                {this.state.edited ?
                    <div className="account-wrapper">
                        <h2 className="title-profil">Information sur le compte</h2>
                        <img className="image-profil" src={this.state.imageUrl} alt={this.state.imageUrl} />
                        <p className="account-info">Votre email : {this.state.email}</p>
                        <p className="account-info">Votre prenom : {this.state.firstName}</p>
                        <p className="account-info">Votre nom : {this.state.lastName}</p>
                        <p className="account-info">
                            <Link
                                className="link-info"
                                to={{
                                    pathname: 'users/' + this.state.uid + '/mangas',
                                    state: { uid: this.state.uid }
                                }}>
                                Mes Mangas
                        </Link>
                        </p>
                        <div className="account">
                            <button className="button-logout" onClick={() => this.setState({ edited: false })}>Editez mes information</button>
                            <button style={{ marginBottom: 10 }} className="button-logout" onClick={this.signOut.bind(this)}>deconnexion</button>
                        </div>
                    </div>
                    :
                    <div className="account-wrapper">
                        <h2 style={{marginTop: 10}} className="title-profil">Editez mes information</h2>
                        <form style={{marginTop: 20}} onSubmit={this.handleSubmit} className="wrapper-form-profil">
                            <CustomUploadButton
                                accept="image/*"
                                name="image"
                                onUploadStart={this.handleUploadStart}
                                storageRef={firebase.storage().ref('avatars/' + this.state.uid)}
                                onUploadSuccess={this.handleUploadSucces}
                                onProgress={this.fileOnProgress}
                                className="uploader-file"
                            >
                                Ajoutez une image
                            </CustomUploadButton>
                            {this.state.progress === 0 ? null : <p className="loading-progress">Chargement de l'image {this.state.progress}%</p>}
                            <input 
                            style={{marginTop: 20}}
                            className="input-form-profil" 
                            type="text" 
                            name="firstName" 
                            value={this.state.firstName} 
                            onChange={this.handleChange} 
                            placeholder="Votre prénom" />
                            <input 
                            className="input-form-profil" 
                            type="text" 
                            name="lastName" 
                            value={this.state.lastName} 
                            onChange={this.handleChange}
                            placeholder="Votre nom" />
                            <input className="button-logout" type="submit" value="Modifier" />
                        </form>
                        {this.state.loaded ? <LoaderCircle /> : null}
                    </div>
                }
            </div>
        )
    }
}