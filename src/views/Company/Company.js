import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import { Link } from "react-router-dom";

class Company extends Component {

  state = {
    company : undefined,
  }

  componentDidMount(){ //alomejor esto es tonteria al ya tener el objeto?
    const company = this.props.match.params.id;
    apiCompany
    .getCompany(company)
    .then((company) => {
      // console.log(company.data)
      this.setState({
        company: company.data
      });
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { user } = this.props;
    const { company } = this.state;  //avisaron que había que tener cuidado con repetir nombre de variables. esto es con las que estan en el provider o a nivel global?
    console.log(company)  //se muestra el objeto pero luego no puedo acceder a owners
    if(company){
      const owner = undefined
      company.owners.includes(user.data._id) ? owner = true : owner = false;
    }
    return (
      <div>
        {!company && 
        <p>Loading</p>
        }
        {company &&
          <div key={company._id}>
            <div className="one-company-of-the-list">
              {/* <img className="img-of-each-company" src={company.image_url} alt={company.name} /> */}
              <div className="info-company">

                <h5>{company.description}</h5>
                Created by : {company.owners}
                {/* //porque no me lo pinta!!!?} */}
                {/* {this.getOwners(company.owners)}  */}
                <ul>
                  <li><Link to={`/establishment/${company.establishment._id}`}><h3>{company.establishment}</h3></Link>{company.establishments}</li>
                </ul>
              </div>
            </div>
          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Company);

// {owner && 
//   <div>
//     <p>Eres el owner de la company</p>
//     {/* <button onClick={this.deleteCompany(company._id)}>Delete Company</button> */}
//   </div>
//   }