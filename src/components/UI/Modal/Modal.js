import React from "react";
import Backdrop from "./../Backdrop/Backdrop";
import classes from "./Modal.module.css";
import Auxillary from "./../../../hoc/Auxillary/Auxillary";

const Modal = props => {
  const { children, show, modalClosed } = props;
  return (
    <Auxillary>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0"
        }}
      >
        {children}
      </div>
    </Auxillary>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);

// ******************* before hooks **************************************
// class Modal extends React.Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     return (
//       nextProps.show !== this.props.show ||
//       nextProps.children !== this.props.children
//     );
//   }

//   render() {
//     const { children, show, modalClosed } = this.props;
//     return (
//       <Auxillary>
//         <Backdrop show={show} clicked={modalClosed} />
//         <div
//           className={classes.Modal}
//           style={{
//             transform: show ? 'translateY(0)' : 'translateY(-100vh)',
//             opacity: show ? '1' : '0'
//           }}
//         >
//           {children}
//         </div>
//       </Auxillary>
//     );
//   }
// }

// export default Modal;
