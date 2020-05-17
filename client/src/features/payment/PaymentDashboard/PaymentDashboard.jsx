import React, { Fragment } from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';
import PaymentList from '../PaymentList/PaymentList';
import PaymentStats from '../PaymentStats/PaymentStats';
import { openModal } from '../../models/modalActions';
import { connect } from 'react-redux';
import { SpeedDial } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const PaymentDashboard = ({ openModal }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <h1>Payments</h1>
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
      <SpeedDial className={classes.speedDial} ariaLabel='Add Payment' open={false} icon={<AddIcon />} onClick={ () => openModal('PaymentFormModal') } />


      
    </Fragment>
  );
};

const actions = {
  openModal
};

export default connect(null, actions)(PaymentDashboard);
