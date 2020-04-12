import React from 'react';
import { Segment, Statistic, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

const PaymentStats = ({stats}) => {
  return (
    <Segment>
      <Statistic size='small'>
        <Statistic.Label>Budget</Statistic.Label>
        <Statistic.Value>{stats? <CurrencyFormat value={stats.budget} displayType={'text'} thousandSeparator={true} prefix={'LKR '} /> : ''}</Statistic.Value>
      </Statistic>
      <Divider />
      <Statistic size='small'>
        <Statistic.Label>Total Spent</Statistic.Label>
        <Statistic.Value>{stats? <CurrencyFormat value={stats.totalSpent} displayType={'text'} thousandSeparator={true} prefix={'LKR '} /> : ''}</Statistic.Value>
      </Statistic>
      <Divider />
      <Statistic size='small'>
        <Statistic.Label>Left</Statistic.Label>
        <Statistic.Value>{stats? <CurrencyFormat value={stats.left} displayType={'text'} thousandSeparator={true} prefix={'LKR '} /> : ''}</Statistic.Value>
      </Statistic>
    </Segment>
  );
};

const mapState = (state, ownProps) => {
  return {
    stats: state.payments.stats
  }
}

export default connect(mapState)(PaymentStats);
