import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ open, closed }) => {
  const attachedClasses = open
    ? `${classes.SideDrawer} ${classes.Open}`
    : `${classes.SideDrawer} ${classes.Close}`;

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
