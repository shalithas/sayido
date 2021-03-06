import Axios from 'axios';
import {
  FETCH_GUESTS,
  CREATE_GUEST,
  FETCH_GUEST,
  UNSELECT_GUEST,
  FETCH_STATS,
  UPDATE_GUEST,
  DELETE_GUEST
} from './guestConsts';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import { toastr } from 'react-redux-toastr';
import { getEnvVar } from '../../app/util/envUtils';

const url = `${getEnvVar('API_URL')}/guests`;

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
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const fetchGuest = id => {
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
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const createGuest = guest => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await Axios.post(url, guest);
      dispatch({
        type: CREATE_GUEST,
        payload: { guest }
      });

      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Guests added');
      dispatch(fetchGuests());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const updateGuest = (id, guest) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await Axios.put(`${url}/${id}`, guest);
      dispatch({
        type: UPDATE_GUEST,
        payload: { guest }
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Guests updated');
      dispatch(fetchGuests());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const deleteGuests = (ids) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await Axios.delete(url, {
        data: {
          ids
        }
      });
      dispatch({
        type: DELETE_GUEST
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Guest/s deleted');
      dispatch(fetchGuests());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const unselectGuest = () => {
  return {
    type: UNSELECT_GUEST
  };
};

export const fetchStats = id => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(`${url}/stats`);
      const stats = res.data;
      dispatch({
        type: FETCH_STATS,
        payload: { stats }
      });
      setTimeout(() => {
        dispatch(asyncActionFinish());
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Opps', 'Something went wrong');
    }
  };
};
