import React from 'react';
import Backdrop from './../Backdrop/Backdrop';
import classes from './Modal.module.css';
import Auxillary from './../../../hoc/Auxillary/Auxillary';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { children, show, modalClosed } = this.props;
    return (
      <Auxillary>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
          }}
        >
          {children}
        </div>
      </Auxillary>
    );
  }
}

export default Modal;
