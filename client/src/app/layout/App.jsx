import React, { Component, Fragment } from "react";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Route } from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import "./App.css";
import GuestListDashboard from "../../features/guest/GuestListDashboard/GuestListDashboard";
import GuestForm from "../../features/guest/GuestForm/GuestForm";
import ModalManager from "../../features/models/ModalManager";
import PaymentDashboard from "../../features/payment/PaymentDashboard/PaymentDashboard";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <NavBar />
        <div className='sayido content'>
          <Route path='/' exact component={Dashboard} />
          <Route path='/guests' exact component={GuestListDashboard} />
          <Route path='/guests/new' exact component={GuestForm} />
          <Route path='/guests/:guestId/edit' exact component={GuestForm} />
          <Route path='/payments' exact component={PaymentDashboard} />
        </div>
      </Fragment>
    );
  }
}
