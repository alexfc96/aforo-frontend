import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
// import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
// import { Link } from "react-router-dom";

class Establishment extends Component {

  state = {
    // company : undefined,
    establishment: undefined,
  }

  componentDidMount(){
    const establishmentID = this.props.match.params.id;
    apiEstablishment
    .getEstablishment(establishmentID)
    .then((establishment) => {
      this.setState({
        establishment
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { user } = this.props;
    const { establishment } = this.state;
    let owner = undefined
    if(establishment){
      //console.log(establishment)
      establishment.owners.includes(user.data._id) ? owner = true : owner = false;
    }
    return (
      <div>
        {!establishment && 
        <p>Loading</p>
        }
        {establishment &&
          <div key={establishment._id} className="info-establishment">
            <h1>{establishment.name}</h1>
            {owner && 
              <div>
                <p>Eres el owner de la establishment</p>
                {/* <button onClick={this.deleteestablishment(establishment._id)}>Delete establishment</button> */}
               </div>
            }
            {/* <img className="img-of-establishment" src={establishment.image_url} alt={establishment.name} /> */}
            <h5>{establishment.description}</h5>
            Created by : {establishment.owners}
            {/* {this.getOwners(establishment.owners)} //tendremos que recibir este metodo por las props del padre. tambien el admin.*/}
            
            <p>Establishments:</p>
            {this.getEstablishments()}

          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Establishment);