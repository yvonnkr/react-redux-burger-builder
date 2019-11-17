import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions/index";

//routing with React.Lazy()
const AsyncCheckout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const AsyncOrders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const AsyncAuth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = ({ isAuthenticated, authCheckState }) => {
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  //prettier-ignore
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading ...</p>} >
         <Switch>
          {isAuthenticated && <Route path="/checkout" component={AsyncCheckout} />}
          {isAuthenticated && <Route path="/orders" component={AsyncOrders} />}
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default withRouter(connect(mapStateToProps, { authCheckState })(App));

// ************* before Hooks ************************************************************************************
// class App extends React.Component {
//   componentDidMount() {
//     this.props.authCheckState();
//   }
//   render() {
//     return (
//       <div>
//         <Layout>
//           <Switch>
//             {this.props.isAuthenticated && (
//               <Route path='/checkout' component={Checkout} />
//             )}
//             {this.props.isAuthenticated && (
//               <Route path='/orders' component={Orders} />
//             )}
//             <Route path='/auth' component={Auth} />
//             <Route path='/logout' component={Logout} />
//             <Route path='/' exact component={BurgerBuilder} />
//             <Redirect to='/' />
//           </Switch>
//         </Layout>
//       </div>
//     );
//   }
// }

// //can use lazy-loading to optimize app -for routes that are not frequently visited --less 378

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.token !== null
// });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { authCheckState }
//   )(App)
// );
