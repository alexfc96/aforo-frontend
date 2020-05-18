import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import { Link } from "react-router-dom";

class MyCompanies extends Component {
  state = {
    // isOwner : undefined,
    haveCompanyAssociated : undefined,
    companies : undefined,
  }

  showCompany(){
    const {companies} = this.state;
    const { user } = this.props;
    companies.forEach(company => {
      return company.name      
    });

    let owner = undefined;
    return companies.map((company) => {
      company.owners.includes(user.data._id) ? owner = true : owner = false;  //sale error de consola (indicando que está mal)
      return <div key={company._id}>
              <div className="one-company-of-the-list">
                {/* <img className="img-of-each-company" src={company.image_url} alt={company.name} /> */}
                <div className="info-company">
                  {/* no puedo pasarle direcctamente las props hacia abajo? company={company} owner={owner} */}
                  <Link to={`/company/${company._id}` } company={company} owner={owner} ><h3>{company.name}</h3></Link>
                  {owner && 
                  <div>
                    <p>Eres el owner de la company</p>
                    {/* <button onClick={this.deleteCompany(company._id)}>Delete Company</button> */}
                  </div>
                  }

                  <h5>{company.description}</h5>
                  Created by : {company.owners}
                  {/* //porque no me lo pinta!!!?} */}
                  {this.getOwners(company.owners)} 
                </div>
             </div>
             <hr/>
            </div>
    })
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
    apiCompany
    .company()
    .then((company) => {
      // console.log(company.data)
      this.setState({
        haveCompanyAssociated : true,
        companies : company.data,
      });
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        haveCompanyAssociated : false,
      });
    });
  }

  render() {
    const { user } = this.props;
    const { haveCompanyAssociated, companies} = this.state;
    // console.log(companies)
    return (
      <div>
        <h1>My companies</h1>
        <p>Welcome {user.name}</p>
        {!haveCompanyAssociated && 
          <p> It seems that you dont have a company associated</p>
        }
        {haveCompanyAssociated && this.showCompany()}
      </div>
    );
  }
}

export default withAuth(MyCompanies);
