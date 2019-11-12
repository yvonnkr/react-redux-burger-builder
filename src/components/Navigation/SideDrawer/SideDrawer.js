import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ open, closed, isAuthenticated }) => {
  const attachedClasses = open
    ? `${classes.SideDrawer} ${classes.Open}`
    : `${classes.SideDrawer} ${classes.Close}`;

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
