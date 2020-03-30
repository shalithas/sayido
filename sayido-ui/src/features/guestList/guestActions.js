import Axios from "axios";
import { FETCH_GUESTS } from "./guestConsts";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { getAllQuery } from "./guestQueries";

const url = `http://localhost:3000/`;

export const fetchGuests = (page = 1) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios({
        url,
        method: "POST",
        data: {
          query: getAllQuery({
            page: 1,
            perPage: 10,
            sortField: 'name'
          })
        }
      });
      const guests = res.data.data.allGuests;
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
