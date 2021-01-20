import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json?auth=' + this.props.authToken)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
        console.log(this.state.orders);
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <h1>Your orders</h1>
        {this.state.loading ? (
          <Spinner />
        ) : (
          this.state.orders.map((order) => (
            <Order
              key={order.id}
              orderId={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.tokens,
    authCondition: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));
