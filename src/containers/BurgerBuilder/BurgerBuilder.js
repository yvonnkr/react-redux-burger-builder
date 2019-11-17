import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath
} from "./../../store/actions/index";

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const { initIngredients } = props;
  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.setAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.purchaseInit();
    props.history.push("/checkout");
  };

  const disabledInfo = { ...props.ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = (
    <OrderSummary
      ingredients={props.ingredients}
      price={props.totalPrice}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />
  );

  if (props.error) {
    return <p>Error! Ingredients cant be loaded</p>;
  }

  // if (loading) {
  //   orderSummary = <Spinner />;
  // }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>

      <Burger ingredients={props.ingredients} />
      <BuildControls
        ingredientAdded={props.addIngredient}
        ingredientRemoved={props.removeIngredient}
        disabled={disabledInfo}
        purchasable={updatePurchaseState(props.ingredients)}
        ordered={purchaseHandler}
        price={props.totalPrice}
        isAuthenticated={props.isAuthenticated}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null,
    error: state.burgerBuilder.error
  };
};

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath
})(withErrorHandler(BurgerBuilder, axios));

// ****************** before hooks ***********************************************************
// export class BurgerBuilder extends Component {
//   state = {
//     purchasing: false
//   };

//   componentDidMount() {
//     this.props.initIngredients();
//   }

//   updatePurchaseState = ingredients => {
//     const sum = Object.keys(ingredients)
//       .map(igKey => {
//         return ingredients[igKey];
//       })
//       .reduce((sum, element) => {
//         return sum + element;
//       }, 0);

//     return sum > 0;
//   };

//   purchaseHandler = () => {
//     if (this.props.isAuthenticated) {
//       this.setState({ purchasing: true });
//     } else {
//       this.props.setAuthRedirectPath("/checkout");
//       this.props.history.push("/auth");
//     }
//   };

//   purchaseCancelHandler = () => {
//     this.setState({ purchasing: false });
//   };

//   purchaseContinueHandler = () => {
//     this.props.purchaseInit();
//     this.props.history.push("/checkout");
//   };

//   render() {
//     const disabledInfo = { ...this.props.ingredients };
//     for (let key in disabledInfo) {
//       disabledInfo[key] = disabledInfo[key] <= 0;
//     }

//     let orderSummary = (
//       <OrderSummary
//         ingredients={this.props.ingredients}
//         price={this.props.totalPrice}
//         purchaseCanceled={this.purchaseCancelHandler}
//         purchaseContinued={this.purchaseContinueHandler}
//       />
//     );

//     if (this.props.error) {
//       return <p>Error! Ingredients cant be loaded</p>;
//     }

//     // if (loading) {
//     //   orderSummary = <Spinner />;
//     // }

//     return (
//       <>
//         <Modal
//           show={this.state.purchasing}
//           modalClosed={this.purchaseCancelHandler}
//         >
//           {orderSummary}
//         </Modal>

//         <Burger ingredients={this.props.ingredients} />
//         <BuildControls
//           ingredientAdded={this.props.addIngredient}
//           ingredientRemoved={this.props.removeIngredient}
//           disabled={disabledInfo}
//           purchasable={this.updatePurchaseState(this.props.ingredients)}
//           ordered={this.purchaseHandler}
//           price={this.props.totalPrice}
//           isAuthenticated={this.props.isAuthenticated}
//         />
//       </>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     ingredients: state.burgerBuilder.ingredients,
//     totalPrice: state.burgerBuilder.totalPrice,
//     isAuthenticated: state.auth.token !== null,
//     error: state.burgerBuilder.error
//   };
// };

// export default connect(mapStateToProps, {
//   addIngredient,
//   removeIngredient,
//   initIngredients,
//   purchaseInit,
//   setAuthRedirectPath
// })(withErrorHandler(BurgerBuilder, axios));

// max's way ***********************************************

//const mapDispatchToProps = dispatch => {
//   return {
//     onIngredientAdded: ingredientName =>
//       dispatch(addIngredient(ingredientName)),
//     onIngredientRemoved: ingredientName =>
//       dispatch(removeIngredient(ingredientName))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
