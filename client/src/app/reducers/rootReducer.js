import { combineReducers } from "redux";
import guestReducer from "../../features/guest/guestReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
    guests: guestReducer,
    async: asyncReducer
});

export default rootReducer;