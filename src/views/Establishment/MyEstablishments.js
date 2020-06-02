import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiEstablishment from "../../services/apiEstablishment";
import SearchEstablishment from "./SearchEstablishment";
import '../../App.css'


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
                    <h5>Address:{establishment.address}</h5>
                    {owner && 
                    <div>
                      <button><Link to={`/establishment/${establishment._id}`}>Admin establishment</Link></button>
                      <button style={{color:"red"}} 
                      // onClick={()=>{this.deleteEstablishment(establishment._id)}}
                      onClick={e =>
                      window.confirm("Are you sure you wish to delete this establishment? All associated clients and owners and their bookings will be deleted.") &&
                      this.deleteEstablishment(establishment._id)
                      }
                      >Delete establishment</button>
                    </div>
                    }
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
        
        {haveEstablishmentsAssociated && <SearchEstablishment />}

        <h1>My establishments</h1>
        Add new establishment?
        <Link to={`/establishment/create`}><button className="btn-create">New establishment</button></Link>
        {!haveEstablishmentsAssociated && 
          <p> It seems that you dont have a establishment associated</p>
        }
        {haveEstablishmentsAssociated && this.showEstablishment()}
      </div>
    );
  }
}

export default withAuth(MyEstablishments);