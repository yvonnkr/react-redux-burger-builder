import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/index';

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated && (
              <Route path='/checkout' component={Checkout} />
            )}
            {this.props.isAuthenticated && (
              <Route path='/orders' component={Orders} />
            )}
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        </Layout>
      </div>
    );
  }
}

//can use lazy-loading to optimize app -for routes that are not frequently visited --less 378

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default withRouter(
  connect(
    mapStateToProps,
    { authCheckState }
  )(App)
);
