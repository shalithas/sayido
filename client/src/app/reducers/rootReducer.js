import { combineReducers } from "redux";
import guestReducer from "../../features/guest/guestReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { reducer as formReducer } from "redux-form";
import { reducer as toastreducer } from "react-redux-toastr";
import modalReducer from "../../features/models/modalReducer";
import paymentReducer from "../../features/payment/paymentReducer";
import vendorReducer from "../../features/vendor/vendorReducer";

const rootReducer = combineReducers({
    guests: guestReducer,
    async: asyncReducer,
    form: formReducer,
    modals: modalReducer,
    toastr: toastreducer,
    payments: paymentReducer,
    vendors: vendorReducer
});

export default rootReducer;