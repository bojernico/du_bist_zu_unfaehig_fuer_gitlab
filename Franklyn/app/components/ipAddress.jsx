import React, { Component } from 'react';
import TestId from './pin';
import { testConnection } from '../scripts/setup';
const urlRegex = require('url-regex');
const ipRegex = require('ip-regex');
import { getText } from '../scripts/utils/valueReader';
import styles from './css/ipAddress.css';

class IpAddress extends Component {
  state = {
    ipAddress: '',
    next: false,
    correct: false,
    language: 'de',
    port: '',
    connectionMessage: '',
    connection: false,
    wrongAttempt: false,
    title: ''
  };

  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    //For testing this.setState({ correct: true });
    //For testing this.setState({ next: true });
    testConnection(
      'http://' + this.state.ipAddress + ':' + this.state.port
    ).then(res => {
      if (res == true) {
        //should be true, or an object with an error
        this.setState({ correct: true });
        this.setState({ connection: true });
      } else {
        this.setState({ wrongAttempt: true });
        this.setState({ connection: false });
      }
    });
    this.setState({ next: true });
    event.preventDefault();
  }

  validateIpAddress() {
    if (this.state.wrongAttempt) {
      return 'form-control is-invalid';
    }
    return 'form-control';
  }

  validatePort() {
    if (this.state.wrongAttempt) {
      return 'form-control is-invalid';
    }
    return 'form-control';
  }

  handleChangeIp(event) {
    this.setState({ wrongAttempt: false });
    this.setState({ ipAddress: event.target.value });
  }
  handleChangePort(event) {
    this.setState({ wrongAttempt: false });
    this.setState({ port: event.target.value });
  }
  checkError() {
    if (this.state.next && !this.state.connection) {
      return (
        <small id="ipAddressInfo" className="text-danger">
          Keine Verbindung zum Server möglich
        </small>
      );
    }
  }
  renderFuction() {
    if (this.state.next && this.state.correct) {
      return <TestId />;
    } else {
      return (
        <React.Fragment>
          <div className="vertical-center">
            <div className="container-fluid">
              <form onSubmit={this.handleSubmit} className={styles.center}>
                <div className="form-group">
                  <label>
                    <div className={styles.ip}>
                      <input
                        type="text"
                        id="ip"
                        className={this.validateIpAddress()}
                        placeholder="IP ADDRESS"
                        value={this.state.ipAddress}
                        onChange={this.handleChangeIp.bind(this)}
                        autoFocus
                      />
                    </div>
                  </label>{' '}
                  <label>
                    <div className={styles.port}>
                      <input
                        type="number"
                        id="port"
                        className={this.validatePort()}
                        placeholder="PORT"
                        value={this.state.port}
                        onChange={this.handleChangePort.bind(this)}
                      />
                    </div>
                  </label>{' '}
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="CONNECT"
                  />
                </div>{' '}
              </form>
              <h1 className={styles.title}>Franklyn</h1>
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
export default IpAddress;
