import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActionFile';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Auth extends Component {
  state = {
    controlForm: {
      email: {
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
    isSignUp: true,
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

    return isaValid;
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthenticate(
      this.state.controlForm.email,
      this.state.controlForm.password,
      this.state.isSignUp
    );
  };

  switchAuthMode = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
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

    let errorMessage = null;
    if (this.props.err) {
      errorMessage = <p>{this.props.err.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Aux>
            {errorMessage}
            <form onSubmit={(e) => this.submitHandler(e)}>
              {formValue}
              <Button btntype='Success'>Submit</Button>
            </form>
            <Button btntype='Danger' clicked={this.switchAuthMode}>
              SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </Aux>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    err: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password, signMethod) =>
      dispatch(actions.authMain(email, password, signMethod)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
