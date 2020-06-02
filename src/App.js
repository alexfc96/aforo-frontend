import React, { Component } from "react";
import { Switch } from "react-router-dom";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PriveteRoute";

import MainPage from "./views/MainPage";
import Home from "./views/Home";
import LoginWithAuth from "./views/Auth/Login";
import SignupWithAuth from "./views/Auth/Signup";

import AuthProvider from "./context/authContext";
import MainNavBar from "./components/MainNavBar/MainNavBar";

import MyCompanies from "./views/Company/MyCompanies";
import Company from "./views/Company/Company";
import MyEstablishments from "./views/Establishment/MyEstablishments.js";
import CreateEstablishment from "./views/Establishment/CreateEstablishment";
import Establishment from "./views/Establishment/Establishment";
import MyUser from "./views/User/MyUser";
import User from "./views/User/User";
import MyBookings from "./views/Bookings/MyBookings";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className="App">
            <MainNavBar />
            <Switch>
              <AnonRoute exact path={"/"} component={MainPage} />
              <AnonRoute exact path={"/login"} component={LoginWithAuth} />
              <AnonRoute exact path={"/signup"} component={SignupWithAuth} />
              <PrivateRoute exact path={"/home"} component={Home} />
              <PrivateRoute exact path={"/company"} component={MyCompanies} />
              <PrivateRoute exact path={"/company/:id"} component={Company} /> 
              <PrivateRoute exact path={"/establishment"} component={MyEstablishments} />
              <PrivateRoute exact path={"/establishment/create"} component={CreateEstablishment} />
              <PrivateRoute exact path={"/establishment/:id"} component={Establishment} />
              <PrivateRoute exact path={"/user"} component={MyUser} /> 
              <PrivateRoute exact path={"/user/:id"} component={User} />
              <PrivateRoute exact path={"/bookings"} component={MyBookings} /> 
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
