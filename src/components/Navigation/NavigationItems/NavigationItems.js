import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    {props.userId ? (
      <NavigationItem link='/orders'>Orders</NavigationItem>
    ) : null}
    <NavigationItem link={props.userId ? '/logout' : '/auth'}>
      {props.userId ? 'Logout' : 'Authenticate'}
    </NavigationItem>
  </ul>
);

const mapStateToProps = (state) => {
  return {
    authCond: state.auth.isAuthenticated,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(navigationItems);
