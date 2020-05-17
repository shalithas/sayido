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
import { unselectPayment, createPayment, updatePayment } from '../paymentActions';

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

  componentWillUnmount(){
    this.props.unselectPayment();
  }

  onFormSubmit = (formData) => {
    const { createPayment, closeModal, initialValues, updatePayment } = this.props;
    const {
      amount,
      service,
      vendor
    } = formData;
    const payment = {
      amount,
      serviceId: service,
      vendorId: vendor
    };

    if(initialValues._id){
      updatePayment(initialValues._id, payment);
    } else {
      createPayment(payment);
    } 
    closeModal();
  }

  render() {
    const { invalid, submitting, pristine, closeModal, vendors, services, handleSubmit } = this.props;
    const vendorOptions = prepareOptions(vendors);
    const serviceOptions = prepareOptions(services);
    return (
      <Form autoComplete='off' name='paymentForm' onSubmit={handleSubmit(this.onFormSubmit)}>
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
  let payment = {};
  
  if(state.payments.selectedPayment){
    payment = {...state.payments.selectedPayment};
    payment.service = state.payments.selectedPayment.service ? state.payments.selectedPayment.service._id : null;
    payment.vendor = state.payments.selectedPayment.vendor ? state.payments.selectedPayment.vendor._id : null;
  }
  
  return {
    vendors: state.vendors.list,
    services: state.services.list,
    selectedPayment: state.payments.selectedPayment,
    initialValues: payment
  };
};

const actions = {
  closeModal,
  fetchVendors,
  fetchServices,
  unselectPayment,
  createPayment,
  updatePayment,
};

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'paymentForm', validate, enableReinitialize: true  })(PaymentForm));
