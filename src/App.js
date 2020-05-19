import React, { Component } from "react";
import { Switch } from "react-router-dom";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PriveteRoute";

import Home from "./views/Home";
import LoginWithAuth from "./views/Auth/Login";
import SignupWithAuth from "./views/Auth/Signup";


import AuthProvider from "./context/authContext";
import MainNavBar from "./components/MainNavBar/MainNavBar";

import MyCompanies from "./views/Company/MyCompanies";
import Company from "./views/Company/Company";
import MyEstablishments from "./views/Establishment/MyEstablishments.js";
import Establishment from "./views/Establishment/Establishment";
import User from "./views/User/User";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className="App">
            <MainNavBar />
            <Switch>
              <AnonRoute exact path={"/login"} component={LoginWithAuth} />
              <AnonRoute exact path={"/signup"} component={SignupWithAuth} />
              {/* context para tener todos los datos/establishments del user */}
              <PrivateRoute exact path={"/home"} component={Home} />
              <PrivateRoute exact path={"/company"} component={MyCompanies} />
              <PrivateRoute exact path={"/company/:id"} component={Company} /> 
              <PrivateRoute exact path={"/establishment"} component={MyEstablishments} />
              <PrivateRoute exact path={"/establishment/:id"} component={Establishment} />
              <PrivateRoute exact path={"/user/:id"} component={User} /> 
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
