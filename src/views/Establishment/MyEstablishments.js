import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";

class MyEstablishments extends Component {
  state = {
    haveEstablishmentsAssociated : undefined,
    establishments: undefined,
    companies : undefined,
  }

  showEstablishment(){
    const {establishments, companies} = this.state;
    const { user } = this.props;

    let owner = undefined;
    return (
      establishments.map((establishment) => {
        // const nameOfCompany = this.getCompany(establishment.company) //controlar la asincronia....
        establishment.owners.includes(user._id) ? owner = true : owner = false;  //sale error de consola (indicando que está mal)
        return <div key={establishment._id}>
                {/* {nameOfCompany.name} */}
                <div className="one-establishment-of-the-list">
                  <div className="info-establishment">
                    <Link to={`/establishment/${establishment._id}` }><h3>{establishment.name}</h3></Link>
                    {owner && 
                    <div>
                      <p>Eres el owner del establishment</p>
                      <button onClick={()=>{this.deleteEstablishment(establishment._id)}}>Delete establishment</button>
                    </div>
                    }
                    <h5>{establishment.address}</h5>
                  </div>
              </div>
              <hr/>
              </div>
      })
    )
  }

  deleteEstablishment(idEstablishment){
    apiEstablishment
    .deleteEstablishment(idEstablishment)
    .then(({ data: company }) => {
      this.setState({
        delete: true
      })
      this.getEstablishments()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getCompany(companyID){  //mirar tema async
    apiCompany
    .getCompany(companyID)
    .then(({ data: dataCompany }) => {
      this.setState({
        companies : [...this.state.companies, dataCompany]
      });
      //return a palo seco tampoco funciona
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getEstablishments(){
    apiEstablishment
    .establishment()
    .then(({ data: establishment }) => {
      console.log(establishment)
      this.setState({
        haveEstablishmentsAssociated : true,
        establishments : establishment,
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        haveEstablishmentsAssociated : false,
      });
    });
  }

  componentDidMount(){
    this.getEstablishments()
  }

  render() {
    const { user } = this.props;
    const { haveEstablishmentsAssociated, establishments, companies } = this.state;
    // console.log(companies)
    return (
      <div>
        <h1>My establishments</h1>
        Do you want to control a new company?
        <Link to={`/establishment/create` }><button>Add new establishment</button></Link>
        {!haveEstablishmentsAssociated && 
          <p> It seems that you dont have a establishment associated</p>
        }
        {haveEstablishmentsAssociated && this.showEstablishment()}
      </div>
    );
  }
}

export default withAuth(MyEstablishments);