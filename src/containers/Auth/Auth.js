import React, { Component } from 'react';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
  state = {
    controlForm: {
      email: {
        // for specifying the ele type, congifurations and the value
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        touched: false,
      },
      password: {
        // for specifying the ele type, congifurations and the value
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        touched: false,
      },
    },
  };

  checkValidity = (value, rules) => {
    let isaValid = true;
    if (rules.required) {
      isaValid = value.trim() !== '' && isaValid;
    }

    if (rules.isEmail) {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(value)) {
        isaValid = false;
      } else {
        isaValid = true;
      }
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
    let updatedValue = { ...this.state.controlForm };
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
    if (c === 2) {
      formIsValid = true;
    }

    updatedValue[keyvalue] = updatedValueObject;
    this.setState({ controlForm: updatedValue, formIsValid: formIsValid });
  };

  render() {
    const formValue = [];
    let message;
    for (let key in this.state.controlForm) {
      switch (key) {
        case 'password':
          message = 'Please enter a strong password';
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
          elementtype={this.state.controlForm[key].elementType}
          elementconfig={this.state.controlForm[key].elementConfig}
          value={this.state.controlForm[key].value}
          touched={
            this.state.controlForm[key].touched
              ? this.state.controlForm[key].touched
              : null
          }
          valid={
            this.state.controlForm[key].validation
              ? this.state.controlForm[key].validation.valid
              : null
          }
          validMessage={message}
          changeValue={(e) => this.changeValueHandler(e.target.value, key)}
        />
      );
      formValue.push(input);
    }
    return (
      <div className={classes.Auth}>
        <form>
          {formValue}
          <Button btntype='Success'>Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
