import React, { Component } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { combineValidators, isRequired } from 'revalidate';
import { closeModal } from '../../models/modalActions';
import { connect } from 'react-redux';
import { fetchVendors } from '../../vendor/vendorActions';
import { fetchServices } from '../../service/serviceActions';

const validate = combineValidators({
  amount: isRequired({ message: 'Payment amount is empty' }),
});

/**
 * Prepares the options list for select elements
 * @param {*} list 
 */
const prepareOptions = (list) => {
  const vendorOptions = [];
  list.forEach((vendor) => {
    vendorOptions.push({
      text: vendor.name,
      value: vendor._id,
      key: vendor._id,
    });
  });
  return vendorOptions;
};

class PaymentForm extends Component {
  componentDidMount() {
    const { fetchVendors, fetchServices } = this.props;
    fetchVendors();
    fetchServices();
  }

  render() {
    const { invalid, submitting, pristine, closeModal, vendors, services } = this.props;
    const vendorOptions = prepareOptions(vendors);
    const serviceOptions = prepareOptions(services);
    return (
      <Form autoComplete='off'>
        <Header color='teal' content='Payment Info' />
        <Field
          component={SelectInput}
          name='service'
          options={serviceOptions}
          placeholder='Service'
        />
        <Field
          component={SelectInput}
          name='vendor'
          options={vendorOptions}
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
    vendors: state.vendors.list,
    services: state.services.list,
  };
};

const actions = {
  closeModal,
  fetchVendors,
  fetchServices
};

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'paymentForm', validate })(PaymentForm));
