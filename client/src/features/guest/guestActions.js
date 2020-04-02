import Axios from "axios";
import { FETCH_GUESTS, CREATE_GUEST } from "./guestConsts";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";

const url = `http://localhost:5000/api/guests`;

export const fetchGuests = (page = 1) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(url);
      const guests = res.data;
      console.log(guests);
      dispatch({
        type: FETCH_GUESTS,
        payload: { guests }
      });
      setTimeout(() => {
        dispatch(asyncActionFinish());
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const createGuest = (guest) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.post(url, guest);
      console.log(res);
      dispatch({
        type: CREATE_GUEST,
        payload: { guest }
      });
      setTimeout(() => {
        dispatch(asyncActionFinish());
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};