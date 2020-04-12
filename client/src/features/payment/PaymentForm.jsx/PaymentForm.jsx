import React, { Component } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { combineValidators, isRequired } from 'revalidate';
import { closeModal } from '../../models/modalActions';
import { connect } from 'react-redux';

const validate = combineValidators({
  amount: isRequired({ message: 'Payment amount is empty' }),
});

class PaymentForm extends Component {
  render() {
    const options = [{ text: 'Test', value: 'test', key: 0 }];
    const { invalid, submitting, pristine, closeModal } = this.props;
    return (
      <Form autoComplete='off'>
        <Header color='teal' content='Payment Info' />
        <Field
          component={SelectInput}
          name='service'
          options={options}
          placeholder='Service'
        />
        <Field
          component={SelectInput}
          name='vendor'
          options={options}
          placeholder='Vendor'
        />
        <Field component={TextInput} name='amount' placeholder='Amount' />
        <Button
          disabled={invalid || submitting || pristine}
          positive
          type='submit'
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            closeModal();
          }}
          type='button'
        >
          Cancel
        </Button>
      </Form>
    );
  }
}

const mapState = (state, ownProps) => {


  return {

  }
}

const actions = {
  closeModal
};

export default connect(mapState, actions)(reduxForm({ form: 'paymentForm', validate })(PaymentForm));
