import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authStateCheck } from './store/actions/indexActionFile';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp(); // checking for tokens in the local storage whenever we load the app
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Authentication} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authStateCheck()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
