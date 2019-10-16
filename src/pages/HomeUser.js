import React from 'react'
// import MangasData from '../components/homeUser/MangasData'
import SearchBar from '../components/homeUser/searchBar'

export default class HomeUser extends React.Component {
    cons
    render() {
        return (
            <div className="wrapper-home">
                {/* <MangasData /> */}
                <SearchBar />
            </div>
        )
    }
}