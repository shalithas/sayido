import React, { Component } from 'react';
import {
  Grid,
  Segment,
  Header,
  Button,
  Form,
  Message
} from 'semantic-ui-react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { connect } from 'react-redux';
import SelectInput from '../../../app/common/form/SelectInput';
import { combineValidators, isRequired } from 'revalidate';
import _ from 'lodash';
import {
  createGuest,
  fetchGuest,
  unselectGuest,
  fetchStats
} from '../guestActions';
import { store } from '../../../app/store/store';

const accompanyingOptions = [
  { key: 0, text: 0, value: 0 },
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 },
  { key: 4, text: 4, value: 4 }
];

const validate = combineValidators({
  name: isRequired({ message: 'Guest name is required' })
});

class GuestForm extends Component {
  state = {
    count: 0
  };

  componentWillMount() {
    const { match, fetchGuest, unselectGuest, fetchStats } = this.props;
    const guestId = match.params.guestId;

    fetchStats();
    if (guestId) {
      fetchGuest(guestId);
    } else {
      unselectGuest();
    }
  }

  componentDidMount() {
    if (this.props.stats) {
      this.setState({
        count: this.props.stats.count + 1
      });
    }
  }

  onFormSubmit = formData => {
    const guest = { ...formData };
    const { unselectGuest, history, createGuest } = this.props;

    createGuest(_.pick(guest, 'name', 'phone', 'email', 'adults', 'children'));
    unselectGuest();
    history.push(`/guests`);
  };

  onAccomanyingChange = (evt, value) => {
    const selecter = formValueSelector('guestForm');
    const state = store.getState();
    this.setState({
      count: this.updateCount(value, selecter(state, 'children'))
    });

    return evt;
  };

  updateCount = (adults = 0, children = 0) => {
    let count = adults + children + 1;
    console.log(count);
    count += this.props.stats.count ? this.props.stats.count : 0;
    console.log(this.props.stats.count);
    return count;
  };

  render() {
    const {
      history,
      invalid,
      submitting,
      pristine,
      handleSubmit,
      stats
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form
              autoComplete='off'
              name='guestForm'
              onSubmit={handleSubmit(this.onFormSubmit)}
            >
              <Header color='teal' content='Guest Information' />
              <Field
                name='name'
                component={TextInput}
                placeholder='Guest Name'
              />
              <Field
                name='phone'
                component={TextInput}
                placeholder='Phone Number'
              />
              <Field
                name='email'
                component={TextInput}
                placeholder='Email Address'
              />
              <Header sub content='Accompanying' />
              <Field
                name='adults'
                component={SelectInput}
                placeholder='Adults'
                value='1'
                options={accompanyingOptions}
                onChange={this.onAccomanyingChange}
              />
              <Field
                name='children'
                component={SelectInput}
                placeholder='Children'
                options={accompanyingOptions}
                onChange={this.onAccomanyingChange}
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  this.props.unselectGuest();
                  history.push(`/guests`);
                }}
                type='button'
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment>
            <Header as='h2' icon='info' content='Guest Count' />
            <Message
              icon='chevron circle right'
              content='Your guests capacity is: 200'
            />
            <Message
              icon='chevron circle right'
              content={`Your invited guest count is: ${stats && stats.count}`}
            />
            <Message
              icon='chevron circle right'
              content={`Your RSVP guest count is: ${stats && stats.rsvpCount}`}
            />
            <Message
              icon='chevron circle right'
              header={`After save your invited guest count is: ${this.state.count}`}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = state => {
  let guest = {};

  if (state.guests.selectedGuest) {
    guest = state.guests.selectedGuest;
  } else {
    guest = {
      adults: 0,
      children: 0
    };
  }

  return {
    initialValues: guest,
    selectedGuest: state.guests.selectedGuest,
    stats: state.guests.stats
  };
};

const actions = {
  createGuest,
  fetchGuest,
  unselectGuest,
  fetchStats
};

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: 'guestForm', validate, enableReinitialize: true })(
    GuestForm
  )
);
