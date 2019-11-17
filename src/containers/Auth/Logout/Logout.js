import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../../store/actions/index";

const Logout = props => {
  const { logout } = props;
  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

export default connect(null, { logout })(Logout);

// ************** before hooks *****************************
// class Logout extends Component {
//   componentDidMount() {
//     this.props.logout();
//   }
//   render() {
//     return <Redirect to='/' />;
//   }
// }

// export default connect(
//   null,
//   { logout }
// )(Logout);
