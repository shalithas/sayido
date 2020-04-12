import React, { Component, Fragment } from 'react';
import { fetchPayments, fetchPaymentStats } from '../paymentActions';
import { connect } from 'react-redux';
import LoadingIndicater from '../../../app/layout/LoadingIndicater';
import '@fortawesome/fontawesome-free/js/all';
import { Button, Item, Icon } from 'semantic-ui-react';

class PaymentList extends Component {
  componentWillMount() {
    this.props.fetchPayments();
    this.props.fetchPaymentStats();
  }

  render() {
    const { payments, loading } = this.props;
    if (loading) return <LoadingIndicater />;
    return (
      <Item.Group divided>
        {payments.map((payment) => (
          <Item>
            <Icon as={Item.Image} className={`fa fa-4x fa-${payment.service.icon}`} />
            <Item.Content>
              <Item.Header as='a'>{payment.service.name}</Item.Header>
              <Item.Description>
                Mada a payment to{' '}
                <a>
                  <b>{payment.vendor.name}</b>
                </a>{' '}
                just now.
              </Item.Description>
            </Item.Content>
            <Button animated>
              <Button.Content visible primary>Edit</Button.Content>
              <Button.Content hidden>
                <Icon name='pencil' />
              </Button.Content>
            </Button>
            <Button animated color='red'>
              <Button.Content visible primary>Del</Button.Content>
              <Button.Content hidden>
                <Icon name='trash' />
              </Button.Content>
            </Button>
          </Item>
        ))}
      </Item.Group>
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

export default connect(mapState, actions)(PaymentList);
