import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import apiCompany from "../../services/apiCompany";
import apiEstablishment from "../../services/apiEstablishment";
import { Link } from "react-router-dom";

import '../../App.css'
import './establishment.css'

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
    howOftenCanBookPerDay: 1,
    error: undefined
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
    const { name, description, percentOfPeopleAllowed, maximumCapacity, company, address, startHourShift, finalHourShift, timeAllowedPerBooking, howOftenCanBookPerDay } = this.state;
    console.log('company antes de enviarlo', company)
    if(company==="----" || company===undefined){
      this.setState({
        error: "Select one company from the list"
      })
    } else{
      const { history } = this.props;
      const establishmentObj = { name, description, capacity:{percentOfPeopleAllowed, maximumCapacity}, company, address, timetable:{startHourShift, finalHourShift, timeAllowedPerBooking, howOftenCanBookPerDay } }
      apiEstablishment
      .createEstablishment(establishmentObj)
      .then(({ data:establishment }) => {
        console.log(establishment)
        history.push(`/establishment/`);
      })
      .catch((error) => {
        console.log(error)
      });
    }
  };

  componentDidMount(){
    apiCompany
    .myCompanies()
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
    const { haveCompanyAssociated, companies, company, error } = this.state;
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
          <form onSubmit={this.handleSubmitForm} className="form-add-establishment">
            <label htmlFor="name">Name:</label>
            <p>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={this.handleChange}
            />
            </p>
            <label htmlFor="description">Description:</label>
            <p>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={this.handleChange}
              cols={20} rows={3}
            />
            </p>
            <p><label htmlFor="company">Company:</label>
            <select id="company" value={company} onChange={this.handleCompany} required>
              <option value="----">----</option>
              {companies.map((objCompany)=>{
                return <option key={objCompany._id} value={objCompany.name}>{objCompany.name}</option>
              })
              }
            </select>*
            </p>
            {error}
            <label htmlFor="address">Address:</label>
            <p><input
              type="text"
              name="address"
              id="address"
              required
              onChange={this.handleChange}
            />
            </p>
            
            <p><u>Capacity:</u></p>
            <p>
            <label htmlFor="maximumCapacity">Maximum capacity:</label>
            <input
              type="number"
              className="numbers"
              name="maximumCapacity"
              id="maximumCapacity"
              required
              onChange={this.handleChange}
            />
            </p>
            
            <p><label htmlFor="percentOfPeopleAllowed">Percent of people allowed:</label>
            <input
              className="numbers"
              type="number"
              name="percentOfPeopleAllowed"
              id="percentOfPeopleAllowed"
              required
              onChange={this.handleChange}
            />%
            </p>
            
            <p><u>Timetable:</u></p>
            <p>
            <label htmlFor="startHourShift">Start hour shift:</label>
            <input
              type="time"
              name="startHourShift"
              id="startHourShift"
              required
              onChange={this.handleChange}
            />
            </p>
            
            <p><label htmlFor="finalHourShift">Final hour shift:</label>
            <input
              type="time"
              name="finalHourShift"
              id="finalHourShift"
              required
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="timeAllowedPerBooking">Time allowed per booking:</label>
              <input
                type="number"
                min="5" max="1440"
                className="numbers"
                name="timeAllowedPerBooking"
                id="timeAllowedPerBooking"
                required
                onChange={this.handleChange}
              />mins
            </p>
            <p><label htmlFor="howOftenCanBookPerDay">How often can book per day:</label>
            <input
              type="number"
              className="numbers"
              name="howOftenCanBookPerDay"
              id="howOftenCanBookPerDay"
              placeholder="1"
              required
              onChange={this.handleChange}
            /> times
            </p>
            <input type="submit" value="Create" className="btn-create" />
          </form>
        }
      </div>
    );
  }
}

export default withAuth(CreateEstablishment);