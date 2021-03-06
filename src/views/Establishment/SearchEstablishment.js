import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

import apiEstablishment from "../../services/apiEstablishment";

const STATUS = {
  isLoading : 'loading',
  isLoaded : 'loaded',
  error : 'error'
}

class SearchEstablishment extends Component {
  state = {
    establishments: [],
    status : STATUS.isLoaded,
    searchValue: "",
  }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getEstablishmentByName(input){
    console.log("nput",input)
    const inputObj = { input }
    apiEstablishment
    .getEstablishmentByName(inputObj)
    .then(({ data: establishments})=>{
      console.log("Lo que me responde", establishments)
      this.setState({
        establishments,
        status : STATUS.isLoaded
      })
      return establishments
    })
    .catch((error) =>{
      this.setState({
        status : STATUS.error
      })
    })
  }

  searchEstablishments = (input) =>{
    if(input.length>1){
      this.setState({
        status : STATUS.isLoading
      })
      this.getEstablishmentByName(input)
    }
  }

  render() {
    const { status, searchValue, establishments } = this.state;

    switch (status) {
      case STATUS.isLoading:
        return <div>
                  <h3>Search Establishment</h3>
                  <input type="text" value={searchValue} onChange={this.handleChange} />
                  <button onClick={()=>this.searchEstablishments(searchValue)}>Search</button>
                  <div>The content is loading</div>
               </div>
      case STATUS.isLoaded:
        return <div>
                  <h3>Search Establishment</h3>
                  <input type="text" value={searchValue} onChange={this.handleChange} minLength="2" />
                  <button onClick={()=>this.searchEstablishments(searchValue)}>Search</button>
                  {establishments.map((establishment)=>{
                    return  <div key={establishment._id}>
                              <Link to={`/establishment/${establishment._id}`}><h3>{establishment.name}</h3></Link>
                            </div>
                  })
                  }
                </div>
      case STATUS.error:
        return <div> Error</div>

      default:
        break;
    }
  }
}

export default withAuth(SearchEstablishment);