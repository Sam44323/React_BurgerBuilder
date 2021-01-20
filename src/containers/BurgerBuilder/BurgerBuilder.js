import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as burgerBuilderAction from '../../store/actions/indexActionFile';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchasable = (ings) => {
    const sum = Object.keys(ings)
      .map((igkey) => ings[igkey])
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);

    return sum > 0;
  };

  sendToAuthenticate = () => {
    this.props.history.push('/auth');
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={(type) => {
              this.props.onAddIngredients(type);
            }}
            ingredientRemoved={(type) => {
              this.props.onRemoveIngredients(type);
            }}
            isAuthenticated={this.props.auth}
            disabled={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            ordered={
              this.props.auth ? this.purchaseHandler : this.sendToAuthenticate
            }
            price={this.props.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    auth: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredients: (ingType) => {
      dispatch(burgerBuilderAction.addIngredients(ingType));
    },

    onRemoveIngredients: (ingType) => {
      dispatch(burgerBuilderAction.removeIngredients(ingType));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
