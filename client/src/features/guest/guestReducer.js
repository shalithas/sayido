import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_GUESTS, FETCH_GUEST, UNSELECT_GUEST } from "./guestConsts";

const initialState = {
    list: [],
    selectedGuest: null
};

const fetchGuests = (state, payload) => {
    return { ...state, list: payload.guests };
}

const fetchGuest = (state, payload) => {
    return { ...state, selectedGuest: payload.guest }
}

const unselectGuest = (state) => {
    return { ...state, selectedGuest: null }
}

export default createReducer(initialState, {
    [FETCH_GUESTS]: fetchGuests,
    [FETCH_GUEST]: fetchGuest,
    [UNSELECT_GUEST]: unselectGuest
});