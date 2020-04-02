import React, { Component, Fragment } from "react";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Route } from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import "./App.css";
import GuestListDashboard from "../../features/guest/GuestListDashboard/GuestListDashboard";
import GuestForm from "../../features/guest/GuestForm/GuestForm";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className='content'>
          <Route path='/' exact component={Dashboard} />
          <Route path='/guests' exact component={GuestListDashboard} />
          <Route path='/guests/new' exact component={GuestForm} />
        </div>
      </Fragment>
    );
  }
}
