import React, { Component } from 'react';
import Verification from './verification';
import styles from './css/pin.css';
const { getExamToken } = require('../scripts/setup');

class Pin extends Component {
  state = {
    value: '',
    pin: '',
    next: false,
    pinInputClass: 'form-control'
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value: value });
    this.setState({ pin: value });
    this.validatePin(event);
    event.preventDefault();
  }

  validatePin(event) {
    if (event.target.value.length == 6) {//    if (event.target.value.length == JSON.parse(sessionStorage.getItem('config')).pinLength) {
      getExamToken(event.target.value, new Date()).then(res => {
        if (res.state) {
          this.setState({ next: true }, () => {
            this.renderFuction();
          });
        } else {
          this.setState({ pinInputClass: 'form-control is-invalid' });
        }
      });
    } else if (event.target.value.length == 0) {
      this.setState({ pinInputClass: 'form-control' });
    }
  }

  renderFuction() {
    if (this.state.next) {
      return <Verification />;
    } else {
      return (
        <React.Fragment>
          <div className="vertical-center">
            <div className="container">
              <form onSubmit={e => { e.preventDefault(); }}>
                <div className="form-group">
                  <label>
                    <input
                      type="number"
                      className={this.state.pinInputClass}
                      id="pinInput"
                      placeholder="PIN"
                      value={this.state.value}
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </label>
                </div>
              </form>
              <div>
                <h1 className={styles.title}>Franklyn</h1>
              </div>
            </div>
          </div>

        </React.Fragment>
      );
    }
  }
  render() {
    return this.renderFuction();
  }
}
export default Pin;
