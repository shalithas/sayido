import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_PAYMENTS, FETCH_PAYMENT_STATS } from "./paymentConsts";

const initialState = {
    list: [],
    stats: null
};

const fetchPayments = (state, payload) => {
    return { ...state, list: payload.payments };
};

const fetchPaymentStats = (state, payload) => {
    return { ...state, stats: payload.stats };
};

export default createReducer(initialState, {
    [FETCH_PAYMENTS]: fetchPayments,
    [FETCH_PAYMENT_STATS]: fetchPaymentStats
});