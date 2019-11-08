import React from 'react';
import Button from './../../UI/Button/Button';

class OrderSummary extends React.Component {
  //this could be a functional component
  componentDidUpdate() {
    // console.log('Order summary will update');
  }
  render() {
    const {
      ingredients,
      purchaseCanceled,
      purchaseContinued,
      price
    } = this.props;

    const ingredientSummary = Object.keys(ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {ingredients[igKey]}
        </li>
      );
    });

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: £ {price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout ?</p>
        <Button btnType='Danger' clicked={purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={purchaseContinued}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
