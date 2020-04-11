import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/asyncActions';
import { getEnvVar } from '../../app/util/envUtils';
import Axios from 'axios';
import {
  CREATE_PAYMENT,
  UPDATE_PAYMENT,
  DELETE_PAYMENT,
  FETCH_PAYMENTS,
} from './paymentConsts';
import { toastr } from 'react-redux-toastr';

const url = `${getEnvVar('API_URL')}/payments`;

export const createPayment = (payment) => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      await Axios.post(url, payment);
      dispatch({
        type: CREATE_PAYMENT,
        payload: { payment },
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Payment created');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError);
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const updatePayment = (id, payment) => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      await Axios.put(`url/${id}`, payment);
      dispatch({
        type: UPDATE_PAYMENT,
        payload: { payment },
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Payment updated');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError);
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const deletePayment = (id) => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      await Axios.delete(`url/${id}`);
      dispatch({
        type: DELETE_PAYMENT,
        payload: { id },
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Payment deleted');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError);
      toastr.error('Opps', 'Something went wrong');
    }
  };
};

export const fetchPayments = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(url);
      const payments = res.data;
      console.log(payments);
      dispatch({
        type: FETCH_PAYMENTS,
        payload: { payments },
      });
      setTimeout(() => {
        dispatch(asyncActionFinish());
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError);
      toastr.error('Opps', 'Something went wrong');
    }
  };
};
