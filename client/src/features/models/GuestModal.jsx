import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";
import GuestForm from "../guest/GuestForm/GuestForm";

const actions = { closeModal };

class GuestModal extends Component {
  render() {
    return (
      <Modal size='small' open={true} onClose={this.props.closeModal}>
        <Modal.Header>Edit Guest</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <GuestForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, actions)(GuestModal);
