// @flow
import React, {
  Component
} from 'react';
import ServerAddress from '../components/serverAddress';

type Props = {};

export default class HomePage extends Component < Props > {
  props: Props;

  render() {
    return <ServerAddress / > ;
  }
}
