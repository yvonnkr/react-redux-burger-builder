import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "./../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/index";
import Spinner from "./../../components/UI/Spinner/Spinner";

const Orders = props => {
  const { fetchOrders, token, userId } = props;

  useEffect(() => {
    fetchOrders(token, userId);
  }, [token, userId, fetchOrders]);

  if (props.loading) {
    return <Spinner />;
  }
  return (
    <div>
      {props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, { fetchOrders })(
  withErrorHandler(Orders, axios)
);

// ******* before hooks *******************************************************************************
// class Orders extends Component {
//   componentDidMount() {
//     this.props.fetchOrders(this.props.token, this.props.userId);
//   }
//   render() {
//     if (this.props.loading) {
//       return <Spinner />;
//     }
//     return (
//       <div>
//         {this.props.orders.map(order => (
//           <Order
//             key={order.id}
//             ingredients={order.ingredients}
//             price={order.price}
//           />
//         ))}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     orders: state.order.orders,
//     loading: state.order.loading,
//     token: state.auth.token,
//     userId: state.auth.userId
//   };
// };

// export default connect(
//   mapStateToProps,
//   { fetchOrders }
// )(withErrorHandler(Orders, axios));
