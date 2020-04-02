import { combineReducers } from "redux";
import guestReducer from "../../features/guest/guestReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    guests: guestReducer,
    async: asyncReducer,
    form: formReducer
});

export default rootReducer;