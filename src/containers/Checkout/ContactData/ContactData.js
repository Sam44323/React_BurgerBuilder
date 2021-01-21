import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {
  addPurchaseOrder,
  resetIngredients,
} from '../../../store/actions/indexActionFile';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        // for specifying the ele type, congifurations and the value
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false,
        },
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          valid: false,
        },
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail',
        },
        value: '',
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
          placeholder: ' select delivery option',
        },
        value: 'fastest',
        validation: {
          valid: true,
        },
      },
    },
    loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const orderValue = {
      name: this.state.orderForm.name.value,
      email: this.state.orderForm.email.value,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      address: {
        street: this.state.orderForm.street.value,
        zipcode: this.state.orderForm.zipcode.value,
        country: this.state.orderForm.country.value,
      },
      delivery: this.state.orderForm.deliveryMethod.value,
      userId: localStorage.getItem('userId'),
    };
    this.props.addOrders(
      orderValue,
      this.props.routerfunction,
      this.props.token
    );
    this.props.resetIngs();
  };

  checkValidity = (value, rules) => {
    console.log(this.props.totalPrice.toFixed(2));
    let isaValid = true;
    if (rules.required) {
      isaValid = value.trim() !== '' && isaValid;
    }

    if (rules.minLength) {
      isaValid = value.length >= rules.minLength && isaValid;
    }

    if (rules.maxLength) {
      isaValid = value.length <= rules.maxLength && isaValid;
    }

    return isaValid;
  };

  changeValueHandler = (value, keyvalue) => {
    let updatedValue = { ...this.state.orderForm };
    const updatedValueObject = { ...updatedValue[keyvalue] };
    updatedValueObject.value = value;
    updatedValueObject.validation.valid = this.checkValidity(
      updatedValueObject.value,
      updatedValueObject.validation
    );
    if ('touched' in updatedValueObject) {
      updatedValueObject.touched = true;
    }

    let c = 0;
    let formIsValid = false;
    for (let key in this.state.orderForm) {
      if (this.state.orderForm[key].validation.valid) {
        ++c;
      }
    }
    if (c === 6) {
      formIsValid = true;
    }

    updatedValue[keyvalue] = updatedValueObject;
    this.setState({ orderForm: updatedValue, formIsValid: formIsValid });
  };

  render() {
    const formValue = [];
    let message;
    for (let key in this.state.orderForm) {
      switch (key) {
        case 'name':
          message = 'Please enter a valid name';
          break;

        case 'zipcode':
          message = 'Please enter a zipcode such as 12345';
          break;

        case 'email':
          message = 'Please enter a valid email such as john@doe.com';
          break;

        default:
          message = null;
      }
      const input = (
        <Input
          key={key}
          elementtype={this.state.orderForm[key].elementType}
          elementconfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          touched={
            this.state.orderForm[key].touched
              ? this.state.orderForm[key].touched
              : null
          }
          valid={
            this.state.orderForm[key].validation
              ? this.state.orderForm[key].validation.valid
              : null
          }
          validMessage={message}
          changeValue={(e) => this.changeValueHandler(e.target.value, key)}
        />
      );
      formValue.push(input);
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formValue}
        <Button
          btntype='Success'
          type='submit'
          disabled={!this.state.formIsValid}
          clicked={null}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.orders.loading,
    token: state.auth.tokens,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOrders: (order, routerFn, tokenValue) =>
      dispatch(addPurchaseOrder(order, routerFn, tokenValue)),
    resetIngs: () => dispatch(resetIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
