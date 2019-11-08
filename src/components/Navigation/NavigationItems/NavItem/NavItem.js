import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavItem = ({ children, link, active, exact }) => {
  return (
    <li className={classes.NavItem}>
      <NavLink to={link} activeClassName={classes.active} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
