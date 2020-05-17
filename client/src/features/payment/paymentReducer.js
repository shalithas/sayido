import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_PAYMENTS, FETCH_PAYMENT_STATS, FETCH_PAYMENT, UNSELECT_PAYMENT } from "./paymentConsts";

const initialState = {
    list: [],
    stats: null,
    selectedPayment: null
};

const fetchPayments = (state, payload) => {
    return { ...state, list: payload.payments };
};

const fetchPayment = (state, payload) => {
    return { ...state, selectedPayment: payload.payment }
};

const unselectPayment = (state) => {
    return { ...state, selectedPayment: null }
};

const fetchPaymentStats = (state, payload) => {
    return { ...state, stats: payload.stats };
};

export default createReducer(initialState, {
    [FETCH_PAYMENTS]: fetchPayments,
    [FETCH_PAYMENT_STATS]: fetchPaymentStats,
    [UNSELECT_PAYMENT]: unselectPayment,
    [FETCH_PAYMENT]: fetchPayment
});