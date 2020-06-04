import React, { Component } from "react";


class ManageUser extends Component {

  state={
    admin: false,
    name: undefined,
    years: undefined,
    mail: undefined,
    currentPassword: undefined,
    newPassword: undefined,
  }

  render() {
    const { user } = this.props;
    const { name, years, mail, currentPassword, newPassword } = this.state;
    return (
      <div className="main-page">
        <form onSubmit={this.handleSubmitForm} className="admin-user">
            <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="years">years</label>
            <input
              type="number"
              name="years"
              id="years"
              value={years}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="mail">mail</label>
            <input
              type="mail"
              name="mail"
              id="mail"
              value={mail}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="currentPassword">currentPassword</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={this.handleChange}
            />
            </p>
            <p>
            <label htmlFor="newPassword">newPassword</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={this.handleChange}
            />
            </p>

            <input type="submit" value="Update" className="btn-create-2" />
          </form>

      </div>
    );
  }
}

export default ManageUser;