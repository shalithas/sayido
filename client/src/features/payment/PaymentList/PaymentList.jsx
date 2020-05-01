import React, { Component } from 'react';
import { fetchPayments, fetchPaymentStats } from '../paymentActions';
import { connect } from 'react-redux';
import LoadingIndicater from '../../../app/layout/LoadingIndicater';
import '@fortawesome/fontawesome-free/js/all';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Checkbox, Button, Icon } from '@material-ui/core';
import ActionMenu from '../../../app/common/ActionMenu';

const useStyles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  icon: {
    minWidth: '90px'
  }
});

class PaymentList extends Component {
  state = {
    isMenuOpen: false,
    anchorEl: null
  }

  componentWillMount() {
    this.props.fetchPayments();
    this.props.fetchPaymentStats();
  }

  openMenu(evt) {
    this.setState({ isMenuOpen: true, anchorEl: evt.currentTarget });
  }

  closeMenu() {
    this.setState({ isMenuOpen: false, anchorEl: null });
  }

  edit(id){
    console.log(id+' edited');
  }

  delete(id){
    console.log(id+' delete');
  }

  render() {
    const { classes } = this.props;
    const { payments, loading } = this.props;
    if (loading) return <LoadingIndicater />;
    return (
      // <Item.Group divided>
      //   {payments.map((payment) => (
      //     <Item key={payment._id}>
      //       <Icon as={Item.Image} className={`fa fa-4x fa-${payment.service.icon}`} />
      //       <Item.Content>
      //         <Item.Header as='a'>{payment.service.name}</Item.Header>
      //         <Item.Description>
      //           Mada a payment to{' '}
      //           <a>
      //             <b>{payment.vendor.name}</b>
      //           </a>{' '}
      //           just now.
      //         </Item.Description>
      //       </Item.Content>
      //       <Button animated>
      //         <Button.Content visible primary>Edit</Button.Content>
      //         <Button.Content hidden>
      //           <Icon name='pencil' />
      //         </Button.Content>
      //       </Button>
      //       <Button animated color='red'>
      //         <Button.Content visible primary>Del</Button.Content>
      //         <Button.Content hidden>
      //           <Icon name='trash' />
      //         </Button.Content>
      //       </Button>
      //     </Item>
      //   ))}
      // </Item.Group>
      <List className={classes.root}>
        {payments.map((payment) => {
          const secondaryText = `amount of ${payment.amount}.`;
          const {isMenuOpen, anchorEl} = this.state;
          const menu = {
            edit: () => this.edit(payment._id),
            delete: () => this.delete(payment._id)
          };
          return (
            <ListItem alignItems='flex-start' key={payment._id}>
              <ListItemIcon className={classes.icon}>
                <Icon
                  className={`fa fa-4x fa-${payment.service.icon}`}
                />
              </ListItemIcon>
              <ListItemText primary={payment.vendor.name} secondary={secondaryText} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  // onChange={handleToggle(value)}
                  // checked={checked.indexOf(value) !== -1}
                  // inputProps={{ 'aria-labelledby': labelId }}
                />
                <Button onClick={ (evt) => this.openMenu(evt) }>Actions</Button>
                <ActionMenu isOpen={isMenuOpen} anchorEl={anchorEl} handleClose={() => this.closeMenu()} actions={menu} />
              </ListItemSecondaryAction>
            </ListItem>
          )
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
