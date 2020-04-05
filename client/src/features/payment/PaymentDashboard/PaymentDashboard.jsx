import React, { Fragment } from 'react'
import { Grid, Icon, Button } from 'semantic-ui-react'
import PaymentList from '../PaymentList/PaymentList'
import { Link } from 'react-router-dom'

const PaymentDashboard = () => {
    return (
        <Fragment>
        <Grid>
          <Grid.Column width={10}>
            <h1>Guest List</h1>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button primary floated='right' as={Link} to='/guests/new'>
              <Icon name='plus' /> Add payment
            </Button>
          </Grid.Column>
        </Grid>

        <PaymentList />
      </Fragment>
    )
}

export default PaymentDashboard
