// @flow
import React, { Component } from 'react';
import IpAddress from '../components/ipAddress';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <IpAddress />;
  }
}
