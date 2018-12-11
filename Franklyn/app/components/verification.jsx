import React, { Component } from 'react';
import Overview from './overview';
const { registerExaminee, enroll } = require('../scripts/setup');

class Verification extends Component {
  state = {
    enrolmentNumber: '',
    firstname: '',
    lastname: '',
    next: false,
    correct: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return function(e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(event) {
    if (
      this.validateEnrolmentNumber() === 'form-control is-valid' &&
      this.validateFirstname() === 'form-control is-valid' &&
      this.validateLastname() === 'form-control is-valid'
    ) {
      registerExaminee(this.state.enrolmentNumber, this.state.firstname, this.state.lastname).then((res) => {
        if(res.state) {
          enroll().then((res) => {
            if(res.state) {
              this.setState({ correct: true });
              this.renderFuction();
            }
          });
        }
      });
      
    }
    this.setState({ next: true });
    event.preventDefault();
  }

  validateFirstname() {
    return this.validate(this.state.firstname, new RegExp('^[a-zA-Zäüöß]+$'));
  }

  validateLastname() {
    return this.validate(this.state.lastname, new RegExp('^[a-zA-Zäüöß]+$'));
  }

  validateEnrolmentNumber() {
    return this.validate(this.state.enrolmentNumber, new RegExp('^.+$'));
  }

  validate(value, regex) {
    if (value.length !== 0) {
      if (!regex.test(value)) {
        return 'form-control is-invalid';
      }
      return 'form-control is-valid';
    }
    return 'form-control';
  }

  renderFuction() {
    if (this.state.next && this.state.correct) {
      return (
        <Overview
          firstname={this.state.firstname}
          lastname={this.state.lastname}
        />
      );
    } else {
      return (
        <div className="vertical-center">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>
                  <input
                    type="text"
                    className={this.validateEnrolmentNumber(
                      this.state.enrolmentNumber
                    )}
                    placeholder="Matrikelnummer"
                    value={this.state.enrolmentNumber}
                    onChange={this.handleChange('enrolmentNumber')}
                    autoFocus
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="text"
                    className={this.validateFirstname(this.state.firstname)}
                    placeholder="Vorname"
                    id="inputLastname"
                    value={this.state.firstname}
                    onChange={this.handleChange('firstname')}
                    />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="text"
                    className={this.validateLastname(this.state.lastname)}
                    placeholder="Nachname"
                    value={this.state.lastname}
                    onChange={this.handleChange('lastname')}
                  />
                </label>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
  render() {
    return this.renderFuction();
  }
}
export default Verification;
