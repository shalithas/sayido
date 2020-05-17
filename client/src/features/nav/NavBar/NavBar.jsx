import React, { Fragment, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import clsx from 'clsx';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const pages = {
  home: {
    key: 'home',
    text: 'Home',
    link: '/'
  },
  guests: {
    key: 'guests',
    text: 'Guests',
    link: '/guests'
  },
  payments: {
    key: 'payments',
    text: 'Payments',
    link: '/payments'
  }
}

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    isOpen: false,
    navLinks: pages,
    activePage: pages.home
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, isOpen: open });
  };

  const handleLinkClick = (page) => event  => {
    setState({
      ...state,
      isOpen: false,
      activePage: page
    });
    history.push(page.link);
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {_.map(state.navLinks, (page) => (
          <ListItem button key={page.key} component='button' onClick={handleLinkClick(page)} selected={ page.key === state.activePage.key } >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={page.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(!state.isOpen)}
            edge='start'
            color='inherit'
            aria-label='menu'
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            {state.activePage.text}
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={state.isOpen} onClose={toggleDrawer(false)}>
        {list('left')}
      </Drawer>
    </Fragment>
  );
};

export default NavBar;
