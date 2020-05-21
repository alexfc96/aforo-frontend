import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiUser from "../../services/apiUser";

class MyUser extends Component {
  state = {
    companies : undefined,
    admin: false,
    name: undefined,
    years: undefined,
    mail: undefined,
    currentPassword: undefined,
    newPassword: undefined,
  }

  handleAdminButton = (e) => {
    this.setState({
      admin: !this.state.admin,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, years, mail, currentPassword, newPassword } = this.state;
    const { user, onLogout } = this.props;
    const { history } = this.props;
    const userObj = { name, years, mail, currentPassword, newPassword }
    apiUser
    .updateUser(user._id, userObj)
    .then(({ data:user }) => {
      onLogout()
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        admin : false,
      });
    });
  };

  componentDidMount(){
    apiCompany
    .company()
    .then(({ data:companies }) => {
      this.setState({
        companies
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        companies: false,
      });
    });
  }

  render() {
    const { user } = this.props;
    const { companies, admin, name, years, mail, currentPassword, newPassword } = this.state;
    return (
      <div>
        <h1>My user</h1>
        Do you want to update your profile info?
        <button onClick={this.handleAdminButton}>Admin profile</button>
        {!admin && 
        <div>
          <h2>{user.name}</h2>
          <h2>{user.years}</h2>
          <h2>{user.mail}</h2>
        </div>
        }
        {admin && 
        <form onSubmit={this.handleSubmitForm}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          />
          <label htmlFor="years">years</label>
          <input
            type="number"
            name="years"
            id="years"
            onChange={this.handleChange}
          />
          <label htmlFor="mail">mail</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            onChange={this.handleChange}
          />
          <label htmlFor="currentPassword">currentPassword</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            onChange={this.handleChange}
          />
          <label htmlFor="newPassword">newPassword</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
        }
        My companies:
        {!companies &&
          <p> It seems that you dont have a company associated</p>
        }
        {companies && 
          <ul>
            {companies.map((company)=>{
              return <li key={company._id}>
                      <Link to={`/company/${company._id}` }><h3>{company.name}</h3></Link>
                    </li>
            })
          }
          </ul>
        }
      </div>
    );
  }
}

export default withAuth(MyUser);