import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const navBarStyle = {
    backgroundColor: '#fafbfc',
    position:'fixed',
    left: 0,
    top:0,
    bottom: 0,
    zIndex: 100,
    margin: 0,
    borderRight: '1px solid #e1e4e8',
    paddingTop: '40px'
};

const NavBar = () => {
  return (
    <Fragment>
      <Menu pointing secondary vertical style={navBarStyle}>
        <Menu.Item name='Dashboard' as={NavLink} to='/' exact />
        <Menu.Item name='Guest List' as={NavLink} to='/guests' exact />
        <Menu.Item name='Payments' as={NavLink} to='/payments' />
      </Menu>
    </Fragment>
  );
};

export default NavBar;
