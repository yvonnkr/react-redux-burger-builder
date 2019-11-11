import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

export default connect(
  mapStateToProps,
  { fetchOrders }
)(withErrorHandler(Orders, axios));
