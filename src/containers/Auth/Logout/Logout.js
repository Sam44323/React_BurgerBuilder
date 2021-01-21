import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/indexActionFile';

class Logout extends Component {
  render() {
    this.props.logoutMethod();
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutMethod: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
