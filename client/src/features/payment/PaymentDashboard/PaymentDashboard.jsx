import React, { Fragment } from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';
import PaymentList from '../PaymentList/PaymentList';
import { Link } from 'react-router-dom';
import PaymentStats from '../PaymentStats/PaymentStats';

const PaymentDashboard = () => {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <h1>Payments</h1>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button primary floated='right' as={Link} to='/guests/new'>
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

export default PaymentDashboard;
