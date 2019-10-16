import React from 'react'

export default class UpdateUserManga extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            nameOfManga: this.props.nameOfManga,
            dateDeSortie: this.props.dateDeSortie,
            description: this.props.description,
            link: this.props.link,
            autheur: this.props.autheur,
            saison: this.props.saison,
            type: this.props.type,
            creePar: this.props.creePar,
        }
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value
        })
    }
}