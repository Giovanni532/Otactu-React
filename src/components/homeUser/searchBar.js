import React from 'react'

export default class SearchBar extends React.Component {
    constructor(){
        super();

        this.state = {
            query: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

}