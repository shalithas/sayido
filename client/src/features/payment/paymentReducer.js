import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_PAYMENTS } from "./paymentConsts";

const initialState = {
    list: []
};

const fetchPayments = (state, payload) => {
    return { ...state, list: payload.payments };
};

export default createReducer(initialState, {
    [FETCH_PAYMENTS]: fetchPayments
});