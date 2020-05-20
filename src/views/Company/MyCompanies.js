import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import { Link } from "react-router-dom";

class MyCompanies extends Component {
  state = {
    // isOwner : undefined,
    delete: false,
    haveCompanyAssociated : undefined,
    companies : undefined,
  }

  showCompany(){
    const {companies} = this.state;
    const { user } = this.props;

    let owner = undefined;
    return companies.map((company) => {
      company.owners.includes(user._id) ? owner = true : owner = false;  //sale error de consola (indicando que está mal)
      return <div key={company._id}>
              <div className="one-company-of-the-list">
                <div className="info-company"> 
                  {/* no puedo pasarle direcctamente las props hacia abajo? company={company} owner={owner} */}
                  <Link to={`/company/${company._id}` }><h3>{company.name}</h3></Link>
                  {owner && 
                  <div>
                    <p>Eres el owner de la company</p>
                    <button onClick={()=>{this.deleteCompany(company._id)}}>Delete Company</button>
                  </div>
                  }
                </div>
             </div>
             <hr/>
            </div>
    })
  }

  deleteCompany = (idCompany) => {
    apiCompany
    .deleteCompany(idCompany)
    .then((company) => {
      // this.forceUpdate(); //ni uno
      this.setState({
        delete: true  //ni el otro funciona
      })
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
        Do you want to control a new company?
        <Link to={`/company/create` }><button>Add new company</button></Link>
        {!haveCompanyAssociated && 
          <p> It seems that you dont have a company associated</p>
        }
        {haveCompanyAssociated && this.showCompany()}
      </div>
    );
  }
}

export default withAuth(MyCompanies);
