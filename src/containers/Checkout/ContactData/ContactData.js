import React, { useState } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";
import Button from "./../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "./../../../components/UI/Input/Input";
import withErrorHandler from "./../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/index";
import { checkValidity } from "./../../../shared/utility";

const ContactData = props => {
  const [orderForm, setOrderform] = useState({
    name: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Your Name" },
      value: "",
      validation: { required: true },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Street" },
      value: "",
      validation: { required: true },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "ZIP Code" },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Country" },
      value: "",
      validation: { required: true },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: { type: "email", placeholder: "Email" },
      value: "",
      validation: { required: true, isEmail: true },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "fastest",
      validation: {},
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = async e => {
    e.preventDefault();

    const formData = {};

    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };

    //ajax via redux action
    props.purchaseBurger(order, props.token);
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    //could use the utility updateObject() here but chose not to -lesson 374
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    // this.setState({ orderForm: updatedOrderForm, formIsValid });
    setOrderform(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={e => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, { purchaseBurger })(
  withErrorHandler(ContactData, axios)
);

// ******************** before hooks ********************************
// class ContactData extends Component {
//   state = {
//     orderForm: {
//       name: {
//         elementType: 'input',
//         elementConfig: { type: 'text', placeholder: 'Your Name' },
//         value: '',
//         validation: { required: true },
//         valid: false,
//         touched: false
//       },
//       street: {
//         elementType: 'input',
//         elementConfig: { type: 'text', placeholder: 'Street' },
//         value: '',
//         validation: { required: true },
//         valid: false,
//         touched: false
//       },
//       zipCode: {
//         elementType: 'input',
//         elementConfig: { type: 'text', placeholder: 'ZIP Code' },
//         value: '',
//         validation: {
//           required: true,
//           minLength: 5,
//           maxLength: 5,
//           isNumeric: true
//         },
//         valid: false,
//         touched: false
//       },
//       country: {
//         elementType: 'input',
//         elementConfig: { type: 'text', placeholder: 'Country' },
//         value: '',
//         validation: { required: true },
//         valid: false,
//         touched: false
//       },
//       email: {
//         elementType: 'input',
//         elementConfig: { type: 'email', placeholder: 'Email' },
//         value: '',
//         validation: { required: true, isEmail: true },
//         valid: false,
//         touched: false
//       },
//       deliveryMethod: {
//         elementType: 'select',
//         elementConfig: {
//           options: [
//             { value: 'fastest', displayValue: 'Fastest' },
//             { value: 'cheapest', displayValue: 'Cheapest' }
//           ]
//         },
//         value: 'fastest',
//         validation: {},
//         valid: true
//       }
//     },
//     formIsValid: false
//     // loading: false
//   };

//   orderHandler = async e => {
//     e.preventDefault();

//     const formData = {};

//     for (let formElementIdentifier in this.state.orderForm) {
//       formData[formElementIdentifier] = this.state.orderForm[
//         formElementIdentifier
//       ].value;
//     }

//     // this.setState({ loading: true });

//     const order = {
//       ingredients: this.props.ingredients,
//       price: this.props.totalPrice,
//       orderData: formData,
//       userId: this.props.userId
//     };

//     //ajax via redux action
//     this.props.purchaseBurger(order, this.props.token);
//   };

//   inputChangedHandler = (e, inputIdentifier) => {
//     const updatedOrderForm = { ...this.state.orderForm };
//     const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

//     //could use the utility updateObject() here but chose not to -lesson 374
//     updatedFormElement.value = e.target.value;
//     updatedFormElement.valid = checkValidity(
//       updatedFormElement.value,
//       updatedFormElement.validation
//     );
//     updatedFormElement.touched = true;
//     updatedOrderForm[inputIdentifier] = updatedFormElement;

//     let formIsValid = true;
//     for (let inputIdentifier in updatedOrderForm) {
//       formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
//     }

//     this.setState({ orderForm: updatedOrderForm, formIsValid });
//   };

//   render() {
//     const formElementsArray = [];

//     for (let key in this.state.orderForm) {
//       formElementsArray.push({
//         id: key,
//         config: this.state.orderForm[key]
//       });
//     }

//     let form = (
//       <form onSubmit={this.orderHandler}>
//         {formElementsArray.map(formElement => (
//           <Input
//             key={formElement.id}
//             elementType={formElement.config.elementType}
//             elementConfig={formElement.config.elementConfig}
//             value={formElement.config.value}
//             invalid={!formElement.config.valid}
//             shouldValidate={formElement.config.validation}
//             touched={formElement.config.touched}
//             changed={e => this.inputChangedHandler(e, formElement.id)}
//           />
//         ))}
//         <Button btnType='Success' disabled={!this.state.formIsValid}>
//           ORDER
//         </Button>
//       </form>
//     );

//     if (this.props.loading) {
//       form = <Spinner />;
//     }

//     return (
//       <div className={classes.ContactData}>
//         <h4>Enter your contact data</h4>
//         {form}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     ingredients: state.burgerBuilder.ingredients,
//     totalPrice: state.burgerBuilder.totalPrice,
//     loading: state.order.loading,
//     token: state.auth.token,
//     userId: state.auth.userId
//   };
// };

// export default connect(
//   mapStateToProps,
//   { purchaseBurger }
// )(withErrorHandler(ContactData, axios));
