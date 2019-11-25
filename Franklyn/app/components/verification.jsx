import React, { Component } from 'react';
import Overview from './overview';
const { enroll } = require('../scripts/setup');
import styles from './css/verification.css';

class Verification extends Component {
  state = {
    firstname: '',
    lastname: '',
    checkBoxState: '',
    checked: false,
    next: false,
    correct: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange() {
    this.setState({ checked: !this.state.checked });
  }
  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(event) {
    if (
      this.validateFirstname() === 'form-control is-valid' &&
      this.validateLastname() === 'form-control is-valid'
    ) {
      var firstname = this.state.firstname;
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
      var lastname = this.state.lastname;
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
      if (this.state.checked) {
        enroll(firstname, lastname, true).then((res) => {
          if (res.state) {
            this.setState({ correct: true });
            this.render();
          }
        });
      }
      enroll(firstname, lastname, false).then((res) => {
        if (res.state) {
          this.setState({ correct: true });
          this.render();
        }
        else {
          this.setState({
            checkBoxState:
              <label className={styles.registeredLabel}>
                Ich habe mich bei diesem Test bereit registriert
                  <input
                  type="checkbox"
                  onChange={this.handleInputChange}
                  defaultChecked={this.state.checked} />
              </label>
          });
          this.render();
        }
      });


    }
    this.setState({ next: true });
    event.preventDefault();
  }

  validateFirstname() {
    return this.validate(this.state.firstname, new RegExp('^[A-Za-zäüöß]{2,}$'));
  }

  validateLastname() {
    return this.validate(this.state.lastname, new RegExp('^[A-Za-zäüöß]{2,}$'));
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

  render() {
    var msg = "";
    if (this.state.checked) {
      msg = "checked";
    } else {
      msg = "unchecked";
    }
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
                    className={this.validateFirstname(this.state.firstname)}
                    placeholder="Vorname"
                    id="inputLastname"
                    value={this.state.firstname}
                    onChange={this.handleChange('firstname')}
                    autoFocus
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
                  value="Weiter"
                />
              </div>

              <div>
                {this.state.checkBoxState}
              </div>
            </form>
            <h1 className={styles.title}>Franklyn</h1>
          </div>
        </div>
      );
    }
  }
}
export default Verification;
