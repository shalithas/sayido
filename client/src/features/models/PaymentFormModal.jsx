import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";
import PaymentForm from "../payment/PaymentForm.jsx/PaymentForm";

const actions = { closeModal };

class PaymentFormModal extends Component {
  render() {
    return (
      <Modal size='small' open={true} onClose={this.props.closeModal}>
        <Modal.Header>Edit Guest</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <PaymentForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, actions)(PaymentFormModal);
