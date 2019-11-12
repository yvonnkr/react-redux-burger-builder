import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import { checkValidity } from './../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Email Adrress' },
        value: '',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: { type: 'password', placeholder: 'Password' },
        value: '',
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.setAuthRedirectPath('/');
    }
  }

  inputChangedHandler = (e, controlName) => {
    //could use the utility updateObject() here but chose not to -lesson 374
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = e => {
    e.preventDefault();

    const { email, password } = this.state.controls;

    this.props.auth(email.value, password.value, this.state.isSignup); //action dispatched
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={e => this.inputChangedHandler(e, formElement.id)}
      />
    ));

    if (this.props.loading) {
      return <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(
  mapStateToProps,
  { auth, setAuthRedirectPath }
)(Auth);
