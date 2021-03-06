import React, { Component } from "react";

import apiClient from "../services/apiClient";

export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ handleSignup, handleLogin, user, isLoggedIn, handleLogout, error}) => {
            return (
              <Comp
                onSignup={handleSignup}
                onLogin={handleLogin}
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                error={error}
                {...this.props}
              />
            );
          }}
        </AuthContext.Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    error: undefined,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then(({ data: user }) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleSignup = ({ username, password, name, mail, years }) => {
    apiClient
      .signup({ username, password, name, mail, years })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        console.log("catch",error)
        this.setState({
          isLoggedIn: false,
          user: null,
          error
        });
      });
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { children } = this.props;
    const { isLoggedIn, user, error } = this.state;
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          user,
          error,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
