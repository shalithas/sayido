import { combineReducers } from "redux";
import guestReducer from "../../features/guest/guestReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { reducer as formReducer } from "redux-form";
import modalReducer from "../../features/models/modalReducer";

const rootReducer = combineReducers({
    guests: guestReducer,
    async: asyncReducer,
    form: formReducer,
    modals: modalReducer
});

export default rootReducer;