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
  
  getOwners(owners){
    apiEstablishment
    .getUser(owners)
    .then((dataOwners) => {
      // console.log(dataOwners.data)
      return <p>·{dataOwners.data.name}</p> //necesario setState?
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount(){
    const establishmentID = this.props.match.params.id;
    apiEstablishment
    .getEstablishment(establishmentID)
    .then((establishment) => {
      this.setState({
        establishment: establishment.data
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
      console.log(establishment)
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
            {/* Descifrar nombre de la company!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <h2>Company:{establishment.company}</h2> 
            {owner && 
              <div>
                <p>Eres el owner de la establishment</p>
                {/* <button onClick={this.deleteestablishment(establishment._id)}>Delete establishment</button> */}
               </div>
            }
            {/* <img className="img-of-establishment" src={establishment.image_url} alt={establishment.name} /> */}
            <h5>{establishment.description}</h5>
            Timetable:
            <ul>
              <li>Start hour: {establishment.timetable.startHourShift}</li>
              <li>Final hour: {establishment.timetable.finalHourShift}</li>
              <li>Time allowed per booking: {establishment.timetable.timeAllowedPerBooking}</li>
            </ul>
            <p>Capacity: {establishment.capacity.maximumCapacity}</p>
            Created by : {establishment.owners}
              {this.getOwners(establishment.owners)} 
            
          </div>
        }      
        </div>
    );
  }
}

export default withAuth(Establishment);