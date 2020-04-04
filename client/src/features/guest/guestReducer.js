import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_GUESTS, FETCH_GUEST, UNSELECT_GUEST, FETCH_STATS } from "./guestConsts";

const initialState = {
    list: [],
    selectedGuest: null,
    stats: null
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

const fetchGuestStats = (state, payload) => {
    return { ...state, stats: payload.stats }
}

export default createReducer(initialState, {
    [FETCH_GUESTS]: fetchGuests,
    [FETCH_GUEST]: fetchGuest,
    [UNSELECT_GUEST]: unselectGuest,
    [FETCH_STATS]: fetchGuestStats
});