import React from 'react';
import classes from './Button.module.css';

const Button = ({ children, clicked, btnType, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={clicked}
      // className={[classes.Button, classes[btnType]].join(' ')}
      className={`${classes.Button} ${classes[btnType]}`}
    >
      {children}
    </button>
  );
};

export default Button;
