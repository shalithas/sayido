import { createReducer } from "../../app/util/reducerUtils";
import { MODAL_OPEN, MODAL_CLOSE } from "./modalConstants";

const initailState = null;

const openModal = (state, payload) => {
    const { modalType, modalProps} = payload;
    return {
        modalType,
        modalProps
    }
}

const closeModal = state => {
    return {};
}

export default createReducer(initailState, {
    [MODAL_OPEN]: openModal,
    [MODAL_CLOSE]: closeModal
})