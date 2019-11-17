import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerClickedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <Toolbar
        drawerToggleClicked={sideDrawerClickedHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);

// *********** before hooks *******************************************************************************
// class Layout extends React.Component {
//   state = {
//     showSideDrawer: false
//   };

//   sideDrawerClosedHandler = () => {
//     this.setState({ showSideDrawer: false });
//   };

//   sideDrawerClickedHandler = () => {
//     this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
//   };

//   render() {
//     return (
//       <>
//         <Toolbar
//           drawerToggleClicked={this.sideDrawerClickedHandler}
//           isAuthenticated={this.props.isAuthenticated}
//         />
//         <SideDrawer
//           open={this.state.showSideDrawer}
//           closed={this.sideDrawerClosedHandler}
//           isAuthenticated={this.props.isAuthenticated}
//         />
//         <main className={classes.Content}>{this.props.children}</main>
//       </>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.token !== null
// });

// export default connect(mapStateToProps)(Layout);
