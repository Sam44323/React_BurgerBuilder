import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    {props.authCond && <NavigationItem link='/orders'>Orders</NavigationItem>}
    <NavigationItem link={props.authCond ? '/logout' : '/auth'}>
      {props.authCond ? 'Logout' : 'Authenticate'}
    </NavigationItem>
  </ul>
);

const mapStateToProps = (state) => {
  return {
    authCond: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(navigationItems);
