import React, { Component, Fragment } from 'react';
import GuestList from '../GuestList/GuestList';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class GuestListDashboard extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={10}>
            <h1>Guest List</h1>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button primary floated='right' as={Link} to='/guests/new'>
              <Icon name='plus' /> Add guest
            </Button>
            <Button content='Get contact details' floated='right' />
          </Grid.Column>
        </Grid>

        <GuestList />
      </Fragment>
    );
  }
}

export default GuestListDashboard;
