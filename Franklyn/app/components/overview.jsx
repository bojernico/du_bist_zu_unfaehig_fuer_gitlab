import React, { Component } from 'react';
import styles from './css/overview.css';
import CountDown from './countDown';

import { takeScreenshots } from '../scripts/modules/screenCapture/screenCaptureModule';
import ScreenshotRepository from '../scripts/repository/screenshotRepository'
import { startSendingHeartbeats } from '../scripts/heartbeatService';

class Overview extends Component {
  state = {
    foreName: '',
    familyName: '',
    testId: '',
    buttonText: 'Start',
    buttonStyle: 'btn btn-primary disabled',
    toolTip: '',
    aviableTime: '',
    message: 'Der Test hat noch nicht begonnen oder ist bereits beendet.'
  };

  constructor(props) {
    super(props);
    startSendingHeartbeats();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (JSON.parse(sessionStorage.getItem('exam')).ongoing == 'true') {
      this.setState({ message: 'Der Test kann gestartet werden.' });
      this.setState({ buttonStyle: 'btn btn-primary' });
      this.getScreenshotsOrErrorMessage();
      event.preventDefault();
    } else {
      this.setState({ buttonStyle: 'btn btn-primary disabled' });
    }
  }

  getScreenshotsOrErrorMessage() {
    if (JSON.parse(sessionStorage.getItem('exam')).ongoing == 'false') {
      return (
        <div className="col-9" className={styles.view}>
          <main role="main" className="m-4">
            <h4 className={styles.darkFont}>{this.state.message}</h4>
            <div className={styles.centerButton}>
              <input
                title={this.state.toolTip}
                className={this.state.buttonStyle}
                type="button"
                value={this.state.buttonText}
                onClick={this.handleClick}
              />
              <h1 className={styles.title}>Franklyn</h1>
            </div>
          </main>
        </div>
      );
    } else {

      var exam = JSON.parse(sessionStorage.getItem('exam'));
      takeScreenshots(
        exam.modules.screenCapture.resolution,
        exam.modules.screenCapture.interval
      );
      ScreenshotRepository.sendScreenshotsToServer();
      const examEndTime = exam.endTime;
      if (typeof examEndTime === 'undefined') {
        return (
          <div className="col-9" className={styles.view}>
            <main role="main" className="m-4">
              <h3 className={styles.darkFont}>Viel Erfolg!</h3>
            </main>
            <h1 className={styles.title}>Franklyn</h1>
          </div>
        );
      } else {
        return (
          <div className="col-9" className={styles.view}>
            <main role="main" className="m-4">
              <h3 className={styles.darkFont}>Viel Erfolg!</h3>
              <h5 className={styles.darkFont}>Verbleibende Zeit:</h5>
              <CountDown date={examEndTime} className={styles.darkFont} />
            </main>
            <h1 className={styles.title}>Franklyn</h1>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <video hidden id="video" ref={this.setVideoRef}>
          Video stream not available.
        </video>
        <canvas id="canvas" hidden ref={this.setCanvasRef} />
        <div className="vertical-center">
          <div className={styles.container}>
            {this.getScreenshotsOrErrorMessage()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Overview;
