import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";

class Company extends Component {

  state = {
    company : undefined,
    owners: [],
    establishments: [],
  }

  getEstablishments(){
    //search establishments by company
    const { company } = this.state;

    apiEstablishment
      .getEstablishmentByCompany(company._id)
      .then(( { data: establishments }) => {
        this.setState({
          establishments
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }

    // if(establishments.length === 0){
    //   return <p>It seems that this company does not yet have establishments</p>
    // } else {
    //   establishments.map(async(establishment)=>{
    //     await apiEstablishment
    //       .getEstablishment(establishment)
    //       .then(( { data: dataEstablishment }) => {
    //         this.setState({
    //           establishments: [...this.state.establishments, dataEstablishment.name]
    //         });
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       });
    //     }
    //   )}
    // };

  getOwners(owners){
    owners.map(async(owner)=>{
      await apiCompany
      .getUser(owner)
      .then(({ data: dataOwner }) => {
        this.setState({
          owners: [...this.state.owners, dataOwner.name]
        });
      })
      .catch((error) => {
        console.log(error)
      });
    })
  }

  componentDidMount(){ //alomejor esto es tonteria al ya tener el objeto?
    const companyID = this.props.match.params.id;
    apiCompany
    .getCompany(companyID)
    .then(({ data: company }) => {
      this.setState({
        company
      });
      this.getOwners(company.owners)
      this.getEstablishments()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { user } = this.props;
    const { company, owners, establishments } = this.state;  //avisaron que había que tener cuidado con repetir nombre de variables. esto es con las que estan en el provider o a nivel global?
    let owner = undefined
    if(company){
      company.owners.includes(user._id) ? owner = true : owner = false;
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
                <button onClick={()=>{this.deleteCompany(company._id)}}>Delete Company</button>
               </div>
            }
            {/* <img className="img-of-company" src={company.image_url} alt={company.name} /> */}
            <h5>{company.description}</h5>
            Created by :
              {owners && 
                <ul>
                  {owners.map((ownerName, index)=>{
                    return <li key={ownerName}>
                            <Link to={`/user/${company.owners[index]}` }><h3>{ownerName}</h3></Link>
                           </li>
                  })}
                </ul>
              }
            <p>Establishments:</p>
              {establishments && 
                <ul>
                  {establishments.map((establishment)=>{
                    console.log(establishment)
                    return <li key={establishment._id}>
                            <Link to={`/establishment/${establishment._id}` }><h3>{establishment.name}</h3></Link>
                          </li>
                  })}
                </ul>
              }

          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Company);

