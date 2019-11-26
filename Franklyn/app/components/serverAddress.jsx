import React, { Component } from 'react';
import TestId from './pin';
import { testConnection } from '../scripts/setup';
import styles from './css/serverAddress.css';
import config from '../config/config';
import packageJson from '../package.json';

class serverAddress extends Component {
  state = {
    serverAddress: '',
    wrongAttempt: false,
    title: '',
    connection: "neverTried"  //neverTried, noConnection, connected, wrongVersion
  };

  constructor(props) {
    super(props);
    this.checkConnection = this.checkConnection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkConnection();
  }

  checkConnection() {
    testConnection(config.getFullUrl())
      .then(res => {
        if (res.state == true) {
          if (JSON.parse(sessionStorage.getItem("config")).version !== packageJson.version) {
            this.setState({ connection: "wrongVersion" });
          }
          else {
            this.setState({ connection: "connected" });
          }
        }
        else {
          this.setState({ connection: "noConnection" })
        }
      })
      .catch(err => {
        this.setState({ connection: "noConnection" })
      })

  }
  handleSubmit(event) {
    testConnection(
      config.getProtocol() + '://' + this.state.serverAddress + ':' + config.getPort()
    ).then(res => {
      if (res.state !== true) {
        this.setState({ wrongAttempt: true });
      }
      else {
        if (JSON.parse(sessionStorage.getItem("config")).version !== packageJson.version) {
          this.setState({ connection: "wrongVersion" });
        }
        else {
          this.setState({ connection: "connected" });
        }
      }
    });
    event.preventDefault();
  }

  validateServerAddress() {
    if (this.state.wrongAttempt) {
      return 'form-control is-invalid';
    }
    return 'form-control';
  }

  handleChangeServerAddress(event) {
    this.setState({ wrongAttempt: false });
    this.setState({ serverAddress: event.target.value });
  }

  render() {
    if (this.state.connection === "neverTried") {
      return <div></div>;
    }
    if (this.state.connection === "connected") return <TestId />;
    else if (this.state.connection === "wrongVersion") return <TestId wrongVersion={true} />;
    else
      return (
        <React.Fragment>
          <div className="vertical-center">
            <div className="container-fluid">
              <form onSubmit={this.handleSubmit} className={styles.center}>
                <div className="form-group">
                  <label>
                    <div className={styles.serverAddress}>
                      <input
                        type="text"
                        id="serverAddress"
                        className={this.validateServerAddress()}
                        placeholder="Server Adresse"
                        value={this.state.serverAddress}
                        onChange={this.handleChangeServerAddress.bind(this)}
                        autoFocus
                      />
                    </div>
                  </label>{' '}
                  <input
                    type="submit"
                    className="btn btn-primary btn-black"
                    value="Verbinden"
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

export default serverAddress;