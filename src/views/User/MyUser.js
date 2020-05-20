import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";

class MyUser extends Component {
  state = {
    companies : undefined,
  }

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
    const { companies } = this.state;
    return (
      <div>
        <h1>My user</h1>
        <h2>{user.name}</h2>
        <h2>{user.years}</h2>
        <h2>{user.mail}</h2>
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