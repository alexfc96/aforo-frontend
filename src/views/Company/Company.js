import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";

class Company extends Component {

  state = {
    company : undefined,
  }

  getEstablishments(){
    const { company } = this.state; 
    if(company.establishments.length === 0){
      return <p>It seems that this company does not yet have establishments</p>
    } else {
      return company.establishments.map((establishment) => { //lo suyo sería crear un ul
          apiEstablishment
          .getEstablishment(establishment)  //si hay mas de uno?
          .then((dataEstablishment) => {
            console.log(dataEstablishment.data.name)
            return <li><Link to={`/establishment/${dataEstablishment.data._id}`}>{dataEstablishment.data.name}</Link></li> //necesario setState?
          })
          .catch((error) => {
            console.log(error)
          });
        }
      )}
  }

  getOwners(owners){
    apiCompany
    .getUser(owners)  //como hacer si hay mas de uno
    .then((dataOwners) => {
      // console.log(dataOwners.data)
      return <p>·{dataOwners.data.name}</p> //necesario setState?
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){ //alomejor esto es tonteria al ya tener el objeto?
    const companyID = this.props.match.params.id;
    apiCompany
    .getCompany(companyID)
    .then((company) => {
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
    let owner = undefined
    if(company){
      company.owners.includes(user.data._id) ? owner = true : owner = false;
    }
    return (
      <div>
        {!company && <p>Loading</p>}
        {company &&
          <div key={company._id} className="info-company">
            <h1>{company.name}</h1>
            {owner && 
              <div>
                <p>Eres el owner de la company</p>
                {/* <button onClick={this.deleteCompany(company._id)}>Delete Company</button> */}
               </div>
            }
            {/* <img className="img-of-company" src={company.image_url} alt={company.name} /> */}
            <h5>{company.description}</h5>
            Created by : {company.owners}
              {/* //porque no me lo pinta!!!?} */}
              {this.getOwners(company.owners)} 
            <p>Establishments:</p>
              {this.getEstablishments()}

          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Company);

