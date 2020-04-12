import React, { Fragment } from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';
import PaymentList from '../PaymentList/PaymentList';
import { Link } from 'react-router-dom';
import PaymentStats from '../PaymentStats/PaymentStats';
import { openModal } from '../../models/modalActions';
import { connect } from 'react-redux';

const PaymentDashboard = ({ openModal }) => {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <h1>Payments</h1>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button primary floated='right' onClick={ () => openModal('PaymentFormModal') }>
              <Icon name='plus' /> Add payment
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <PaymentList />
          </Grid.Column>
          <Grid.Column width={6}>
            <PaymentStats />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      
    </Fragment>
  );
};

const actions = {
  openModal
};

export default connect(null, actions)(PaymentDashboard);
