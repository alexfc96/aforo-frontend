import React, { Component } from "react";

import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";

class Establishment extends Component {

  state = {
    company : undefined,
    establishment: undefined,
    owners: [],
  }

  getNameOfCompany(companyID){
    const { establishment } = this.state;
    apiCompany
    .getCompany(companyID)
    .then((company) => {
      this.setState({
        company: company.data.name
      });
      this.getOwners(establishment.owners)//lo pongo aquí porque si no se pinta 2 veces los nombres de los owners
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  getOwners(owners){
    owners.map(async(owner)=>{
      await apiEstablishment
      .getUser(owner)
      .then((dataOwner) => {
        this.setState({
          owners: [...this.state.owners, dataOwner.data.name]
        });
      })
      .catch((error) => {
        console.log(error)
      });
    })
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
    const { establishment, company, owners } = this.state;
    let owner = undefined
    if(establishment){
      // console.log(establishment)
      establishment.owners.includes(user._id) ? owner = true : owner = false;
    }
    return (
      <div>
        {!establishment && 
        <p>Loading</p>
        }
        {establishment &&
          <div key={establishment._id} className="info-establishment">
            <h1>{establishment.name}</h1>
            {!company && this.getNameOfCompany(establishment.company)}
            {company &&
              <h2>Company:<Link to={`/company/${establishment.company}` }><h3>{company}</h3></Link></h2> 
            }
            {owner && 
              <div>
                <p>Eres el owner de la establishment</p>
                <button onClick={()=>{this.deleteestablishment(establishment._id)}}>Delete establishment</button>
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
            Created by :
              {/* {owners.length===0 && this.getOwners(establishment.owners)} puesto después de getnameofcompany para que no se pinten 2 veces*/} 
              {owners && 
                <ul>
                  {owners.map((ownerName, index)=>{
                    return <li key={ownerName}>
                            <Link to={`/user/${establishment.owners[index]}` }><h3>{ownerName}</h3></Link>
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

export default withAuth(Establishment);