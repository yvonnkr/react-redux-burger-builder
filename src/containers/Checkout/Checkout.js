import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  if (!props.ingredients) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      {props.purchased ? <Redirect to="/" /> : null}
      <CheckoutSummary
        ingredients={props.ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={`${props.match.path}/contact-data`}
        component={ContactData}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);

// ***************** before hooks ****************************************************************
// class Checkout extends Component {
//   checkoutCancelledHandler = () => {
//     this.props.history.goBack();
//   };

//   checkoutContinuedHandler = () => {
//     this.props.history.replace('/checkout/contact-data');
//   };

//   render() {
//     // const summary = <Redirect to='/' />
//     if (!this.props.ingredients) {
//       return <Redirect to='/' />;
//     }
//     return (
//       <div>
//         {this.props.purchased ? <Redirect to='/' /> : null}
//         <CheckoutSummary
//           ingredients={this.props.ingredients}
//           checkoutCancelled={this.checkoutCancelledHandler}
//           checkoutContinued={this.checkoutContinuedHandler}
//         />
//         <Route
//           path={`${this.props.match.path}/contact-data`}
//           component={ContactData}
//         />
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     ingredients: state.burgerBuilder.ingredients,
//     purchased: state.order.purchased
//   };
// };

// export default connect(mapStateToProps)(Checkout);
