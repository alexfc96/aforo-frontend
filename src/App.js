import React, { Component } from "react";
import { Switch } from "react-router-dom";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PriveteRoute";

import Protected from "./views/Protected";
import LoginWithAuth from "./views/Login";
import SignupWithAuth from "./views/Signup";


import AuthProvider from "./context/authContext";
import MainNavBar from "./components/MainNavBar/MainNavBar";
import MyCompanies from "./views/Company/MyCompanies";
import Company from "./views/Company/Company";

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
              <PrivateRoute exact path={"/company"} component={MyCompanies} />
              <PrivateRoute exact path={"/company/:id"} component={Company} />  
              <PrivateRoute exact path={"/protected"} component={Protected} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
