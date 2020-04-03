import Axios from "axios";
import { FETCH_GUESTS, CREATE_GUEST, FETCH_GUEST, UNSELECT_GUEST } from "./guestConsts";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";

const url = `http://localhost:5000/api/guests`;

export const fetchGuests = (page = 1) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(url);
      const guests = res.data;
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

export const fetchGuest = (id) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(`${url}/${id}`);
      const guest = res.data;
      dispatch({
        type: FETCH_GUEST,
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

export const createGuest = (guest) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await Axios.post(url, guest);
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

export const unselectGuest = () => {
  return {
    type: UNSELECT_GUEST
  }
}
