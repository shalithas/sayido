import React, { Component } from 'react';
import { fetchPayments, fetchPaymentStats } from '../paymentActions';
import { connect } from 'react-redux';
import LoadingIndicater from '../../../app/layout/LoadingIndicater';
import '@fortawesome/fontawesome-free/js/all';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Icon,
  ListItemAvatar,
  Avatar,
  Slide,
} from '@material-ui/core';
import ActionMenu from '../../../app/common/ActionMenu';
import { deepOrange, pink, green } from '@material-ui/core/colors';
import DehazeIcon from '@material-ui/icons/Dehaze';

const useStyles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  icon: {
    // minWidth: '90px',
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  orange: {
    color: '#fff',
    backgroundColor: deepOrange[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
});

class PaymentList extends Component {
  state = {
    isMenuOpen: false,
    anchorEl: null,
  };

  componentDidMount() {
    this.props.fetchPayments();
    this.props.fetchPaymentStats();
  }

  openMenu(evt) {
    this.setState({ isMenuOpen: true, anchorEl: evt.currentTarget });
  }

  closeMenu() {
    this.setState({ isMenuOpen: false, anchorEl: null });
  }

  edit(id) {
    console.log(id + ' edited');
  }

  delete(id) {
    console.log(id + ' delete');
  }

  render() {
    const { classes } = this.props;
    const { payments, loading } = this.props;
    if (loading) return <LoadingIndicater />;
    return (
      <List className={classes.root}>
        {payments.map((payment) => {
          const secondaryText = `amount of ${payment.amount}.`;
          const { isMenuOpen, anchorEl } = this.state;
          const menu = {
            edit: () => this.edit(payment._id),
            delete: () => this.delete(payment._id),
          };
          return (
            <Slide direction='right' key={payment._id} in={true}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar className={classes.green}>
                    <Icon className={`fa fa-${payment.service.icon}`} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={payment.vendor.name}
                  secondary={secondaryText}
                />
                <ListItemSecondaryAction>
                  <Button
                    onClick={(evt) => this.openMenu(evt)}
                    variant='outlined'
                  >
                    <DehazeIcon />
                  </Button>
                  <ActionMenu
                    isOpen={isMenuOpen}
                    anchorEl={anchorEl}
                    handleClose={() => this.closeMenu()}
                    actions={menu}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Slide>
          );
        })}
      </List>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    payments: state.payments.list,
    loading: state.async.loading,
  };
};

const actions = {
  fetchPayments,
  fetchPaymentStats,
};

export default connect(mapState, actions)(withStyles(useStyles)(PaymentList));
