import React from 'react';
import { Segment, Statistic, Divider } from 'semantic-ui-react';

const PaymentStats = () => {
  return (
    <Segment>
      <Statistic size='small'>
        <Statistic.Label>Budget</Statistic.Label>
        <Statistic.Value>2,204</Statistic.Value>
      </Statistic>
      <Divider />
      <Statistic size='small'>
        <Statistic.Label>Total Spent</Statistic.Label>
        <Statistic.Value>2,204</Statistic.Value>
      </Statistic>
      <Divider />
      <Statistic size='small'>
        <Statistic.Label>Left</Statistic.Label>
        <Statistic.Value>2,204</Statistic.Value>
      </Statistic>
    </Segment>
  );
};

export default PaymentStats;
