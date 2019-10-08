import React from 'react'
import MangasData from '../components/homeUser/MangasData'
import SearchBar from '../components/homeUser/searchBar'
export default class HomeUser extends React.Component {
    render() {
        return (
            <div>
                <MangasData />
                <SearchBar />
            </div>
        )
    }
}