import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";

class CreateEstablishment extends Component {
  state = {
    haveCompanyAssociated : false,
    companies : undefined,
    name: "",
    description: "",
    address: "",
    company: undefined,
    percentOfPeopleAllowed: 0,
    maximumCapacity: 0,
    startHourShift: 0,
    finalHourShift: 0,
    timeAllowedPerBooking: 0,
  }

  handleCompany = (event) => {
    this.setState({company: event.target.value});
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, description, percentOfPeopleAllowed, maximumCapacity, company, address, startHourShift, finalHourShift, timeAllowedPerBooking } = this.state;
    console.log('company antes de enviarlo', company)
    const { history } = this.props;
    const establishmentObj = { name, description, capacity:{percentOfPeopleAllowed, maximumCapacity}, company, address, timetable:{startHourShift, finalHourShift, timeAllowedPerBooking} }
    apiEstablishment
    .createEstablishment(establishmentObj)
    .then(({ data:establishment }) => {
      console.log(establishment)
      history.push(`/establishment/`);
    })
    .catch((error) => {
      console.log(error)
    });
  };

  componentDidMount(){
    apiCompany
    .company()
    .then(({ data: companies }) => {
      this.setState({
        haveCompanyAssociated : true,
        companies,
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
    const { haveCompanyAssociated, companies, company } = this.state;
    console.log(company)
    return (
      <div>
        <h1>Create establishment</h1>
        {!haveCompanyAssociated && 
        <div>
          <p>It seems that you do not yet have a company created or are not managed by any.</p>
          <Link to={`/company` }><button>Company</button></Link>
        </div>
        }
        {haveCompanyAssociated && 
          <form onSubmit={this.handleSubmitForm}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={this.handleChange}
            />
            <label htmlFor="company">company</label>
            <select id="company" value={company} onChange={this.handleCompany}>
              <option value="----">----</option>
              {companies.map((objCompany)=>{
                return <option key={objCompany._id} value={objCompany.name}>{objCompany.name}</option>
              })
              }
            </select><br/>
            <label htmlFor="address">address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={this.handleChange}
            />
            Capacity:
            <label htmlFor="maximumCapacity">maximumCapacity</label>
            <input
              type="number"
              name="maximumCapacity"
              id="maximumCapacity"
              required
              onChange={this.handleChange}
            />
            <label htmlFor="percentOfPeopleAllowed">percentOfPeopleAllowed</label>
            <input
              type="number"
              name="percentOfPeopleAllowed"
              id="percentOfPeopleAllowed"
              required
              onChange={this.handleChange}
            />
            Timetable:
            <label htmlFor="startHourShift">startHourShift</label>
            <input
              type="time"
              name="startHourShift"
              id="shareClients"
              required
              onChange={this.handleChange}
            />
            <label htmlFor="finalHourShift">finalHourShift</label>
            <input
              type="time"
              name="finalHourShift"
              id="shareClients"
              required
              onChange={this.handleChange}
            />
            <label htmlFor="timeAllowedPerBooking">timeAllowedPerBooking</label>
            <input
              type="number"
              name="timeAllowedPerBooking"
              id="shareClients"
              required
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
          </form>
        }
      </div>
    );
  }
}

export default withAuth(CreateEstablishment);