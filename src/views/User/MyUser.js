import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiUser from "../../services/apiUser";

import './user.css'
import '../../App.css'

class MyUser extends Component {
  state = {
    companies : undefined,
    myCompanies: undefined,
    admin: false,
    name: undefined,
    years: undefined,
    mail: undefined,
    currentPassword: undefined,
    newPassword: undefined,
  }

  handleAdminButton = (e) => {
    const { user } = this.props;
    this.setState({
      admin: !this.state.admin,
      name: user.name,
      mail: user.mail,
      years: user.years
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { user, onLogout } = this.props;
    const { name, years, mail, currentPassword, newPassword } = this.state;
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

  deleteUser(){
    const { history } = this.props;
    apiUser
    .deleteUser()
    .then(() => {
      history.push("/");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getCompanies(){ //where I am client
    apiCompany
    .company()
    .then(({ data:companies }) => {
      const { myCompanies } = this.state;
      for (let i = 0; i < myCompanies.length; i++) {
        for (let x = 0; x < companies.length; x++) {
          if(myCompanies[i]._id===companies[x]._id){
            companies.splice(x, 1)
          }
        }
      }
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

  getMyCompanies(){ //where I am owner
    apiCompany
    .myCompanies()
    .then(({ data:myCompanies }) => {
      this.setState({
        myCompanies
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        myCompanies: false,
      });
    });
  }

  componentDidMount(){
    this.getMyCompanies()
    this.getCompanies()
  }

  render() {
    const { user } = this.props;
    const { companies, myCompanies, admin, name, years, mail, currentPassword, newPassword } = this.state;
    return (
      <div>
        <h1>My profile</h1>
        <div className="info-user">
          {!admin &&
          <div>
            <h2>Name: {user.name}</h2>
            {years && <h3>Years: {user.years}</h3>}
            <h3>Mail: {user.mail}</h3>
          </div>
          }
          <button onClick={this.handleAdminButton}>Admin profile</button><br/>

          {admin &&
          <form onSubmit={this.handleSubmitForm} className="admin-user">
            <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="years">years</label>
            <input
              type="number"
              name="years"
              id="years"
              value={years}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="mail">mail</label>
            <input
              type="mail"
              name="mail"
              id="mail"
              value={mail}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="currentPassword">currentPassword</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="newPassword">newPassword</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={this.handleChange}
            />
            </p>

            <input type="submit" value="Update" className="btn-create-2" />
          </form>
          }
          My companies:
          {myCompanies &&
            <ul>
              {myCompanies.map((company)=>{
                return <li key={company._id}>
                        <Link to={`/company/${company._id}`}><h3>{company.name}</h3></Link>
                      </li>
              })
            }
            </ul>
          }
          {!myCompanies &&
            <p>It seems that you do not own any company</p>
          }

          Companies where I am subscribed:
          {companies &&
            <ul>
              {companies.map((company)=>{
                return <li key={company._id}>
                        <Link to={`/company/${company._id}`}><h3>{company.name}</h3></Link>
                      </li>
              })
            }
            </ul>
          }
          {!companies &&
            <p> It seems that you dont have a company associated</p>
          }
          {admin &&
            <button style={{color:"red"}}
                //onClick={()=>{this.deleteUser()}}>Delete profile(hacerlo!)</button>//crear dekete user
                onClick={e =>
                      window.confirm("Are you sure you wish to delete your user? All your bookings will be lost and all establishments and companies will be deleted if there is no other associated owner.") &&
                      this.deleteUser()
                      }
                >Delete user</button>

          }
        </div>

      </div>
    );
  }
}

export default withAuth(MyUser);