import React from "react";
import { connect } from "react-redux";
import GuestModal from "./GuestModal";

const modalLookUp = {
  GuestModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;
  if (currentModal && currentModal.modalType) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookUp[modalType];

    renderedModal = <ModalComponent {...modalProps} />
  }
  return <span>{renderedModal ?  renderedModal : ''}</span>;
};

export default connect(mapState)(ModalManager);
