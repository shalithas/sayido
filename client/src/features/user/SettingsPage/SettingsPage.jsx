import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Wedding from './Wedding';
import PersonalDetails from './PersonalDetails';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Fragment>{children}</Fragment>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class SettingsPage extends Component {
  state = {
    page: 0
  }

  handleChange = (event, newValue) => {
    this.setState({
      page: newValue
    });
  }

  render() {
    const { classes } = this.props;
    const { page } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={page} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Personal Details" {...a11yProps(0)} />
            <Tab label="Wedding" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={page} index={0} children={<PersonalDetails />} />
        <TabPanel value={page} index={1} children={<Wedding />} />
      </div>
    );
  }
}

export default withStyles(useStyles)(SettingsPage);
