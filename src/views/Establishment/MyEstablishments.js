import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";

class MyEstablishments extends Component {
  state = {
    haveEstablishmentsAssociated : undefined,
    establishments: undefined,
  }

  showEstablishment(){
    const {establishments, } = this.state;
    const { user } = this.props;

    let owner = undefined;
    return (
      establishments.map((establishment) => {
        //pensar si poner el nombre de la company. yo creo que no.
        establishment.owners.includes(user._id) ? owner = true : owner = false;
        return <div key={establishment._id}>
                <div className="one-establishment-of-the-list">
                  <div className="info-establishment">
                    <Link to={`/establishment/${establishment._id}`}><h3>{establishment.name}</h3></Link>
                    {owner && 
                    <div>
                      <button><Link to={`/establishment/${establishment._id}`}>Admin establishment</Link></button>
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
    .then(() => {
      this.getEstablishments()
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getEstablishments(){
    apiEstablishment
    .establishment()
    .then(({ data: establishments }) => {
      this.setState({
        haveEstablishmentsAssociated : true,
        establishments
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
    const { haveEstablishmentsAssociated } = this.state;
    return (
      <div>
        <h1>My establishments</h1>
        Add new establishment?
        <Link to={`/establishment/create`}><button>New establishment</button></Link>
        {!haveEstablishmentsAssociated && 
          <p> It seems that you dont have a establishment associated</p>
        }
        {haveEstablishmentsAssociated && this.showEstablishment()}
      </div>
    );
  }
}

export default withAuth(MyEstablishments);