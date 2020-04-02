import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const navBarStyle = {
    backgroundColor: 'white',
    position:'fixed',
    left: 0,
    top:0,
    bottom: 0,
    zIndex: 100
};

const NavBar = () => {
  return (
    <Fragment>
      <Menu pointing secondary vertical style={navBarStyle}>
        <Menu.Item name='Dashboard' as={NavLink} to='/' exact />
        <Menu.Item name='Guest List' as={NavLink} to='/guests' exact />
        <Menu.Item name='friends' active={false} />
      </Menu>
    </Fragment>
  );
};

export default NavBar;
