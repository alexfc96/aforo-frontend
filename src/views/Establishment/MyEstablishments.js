import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";


class MyEstablishments extends Component {
  state = {
    // isOwner : undefined,
    haveEstablishmentsAssociated : undefined,
    establishments: undefined,
    // companies : undefined,
  }

  showEstablishment(){
    const {establishments} = this.state;
    const { user } = this.props;

    let owner = undefined;
    return establishments.map((establishment) => {
      establishment.owners.includes(user.data._id) ? owner = true : owner = false;  //sale error de consola (indicando que está mal)
      return <div key={establishment._id}>
              <div className="one-establishment-of-the-list">
                <div className="info-establishment">
                  <Link to={`/establishment/${establishment._id}` }><h3>{establishment.name}</h3></Link>
                  {owner && 
                  <div>
                    <p>Eres el owner del establishment</p>
                    {/* <button onClick={this.deleteestablishment(establishment._id)}>Delete establishment</button> */}
                  </div>
                  }

                  <h5>{establishment.address}</h5>

                </div>
             </div>
             <hr/>
            </div>
    })
  }

  deleteCompany(idCompany){
    apiCompany
    .deleteCompany(idCompany)
    .then((company) => {
      console.log(company.data)
      return <p>{ company.data }</p> //necesario setState? //mostrar aviso de que se ha borrado corrrectamente
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){
    apiEstablishment
    .establishment()
    .then((establishment) => {
      console.log(establishment.data)
      this.setState({
        haveEstablishmentsAssociated : true,
        establishments : establishment.data,
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        haveEstablishmentsAssociated : false,
      });
    });
  }

  render() {
    const { user } = this.props;
    const { haveEstablishmentsAssociated, establishments} = this.state;
    // console.log(companies)
    return (
      <div>
        <h1>My establishments</h1>
        {!haveEstablishmentsAssociated && 
          <p> It seems that you dont have a establishment associated</p>
        }
        {haveEstablishmentsAssociated && this.showEstablishment()}
      </div>
    );
  }
}

export default withAuth(MyEstablishments);