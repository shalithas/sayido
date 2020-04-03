import React, { Component } from 'react';
import { Grid, Segment, Header, Button, Form } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { connect } from 'react-redux';
import SelectInput from '../../../app/common/form/SelectInput';
import { combineValidators, isRequired } from 'revalidate';
import { createGuest, fetchGuest, unselectGuest } from '../guestActions';

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
  componentWillMount() {
    const { match, fetchGuest, unselectGuest } = this.props;
    const guestId = match.params.guestId;
    if (guestId) {
      fetchGuest(guestId);
    } else {
      unselectGuest();
    }
  }

  onFormSubmit = formData => {
    const guest = { ...formData };
    const { unselectGuest, history, createGuest } = this.props;

    createGuest(guest);
    unselectGuest();
    history.push(`/guests`);
  };

  render() {
    const { history, invalid, submitting, pristine, handleSubmit } = this.props;
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
                options={accompanyingOptions}
              />
              <Field
                name='children'
                component={SelectInput}
                placeholder='Children'
                options={accompanyingOptions}
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
      </Grid>
    );
  }
}

const mapState = (state) => {
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
    selectedGuest: state.guests.selectedGuest
  };
};

const actions = {
  createGuest,
  fetchGuest,
  unselectGuest
};

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: 'guestForm', validate, enableReinitialize: true })(
    GuestForm
  )
);
