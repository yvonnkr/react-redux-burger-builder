import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1]; //+ converts from string to number
      } else {
        ingredients[param[0]] = +param[1]; //+ converts from string to number
      }
    }

    this.setState({ ingredients, totalPrice: price.toFixed(2) });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
          //   component={ContactData}
        />
      </div>
    );
  }
}
