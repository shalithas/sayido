import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_GUESTS } from "./guestConsts";

const initialState = [];

const fetchGuests = (state, payload) => {
    return payload.guests;
}

export default createReducer(initialState, {
    [FETCH_GUESTS]: fetchGuests
});