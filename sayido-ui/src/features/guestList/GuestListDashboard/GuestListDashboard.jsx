import React, { Component, Fragment } from 'react'
import GuestList from '../GuestList/GuestList'

class GuestListDashboard extends Component {
    render() {
        return (
            <Fragment>
                <h1>Guest List</h1>

                <GuestList />
            </Fragment>
        )
    }
}

export default GuestListDashboard
