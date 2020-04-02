import React, { Component, Fragment } from "react";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Route } from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import "./App.css";
import GuestListDashboard from "../../features/guestList/GuestListDashboard/GuestListDashboard";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className='content'>
          <Route path='/' exact component={Dashboard} />
          <Route path='/guest-list' component={GuestListDashboard} />
        </div>
      </Fragment>
    );
  }
}
