import { getEnvVar } from '../../app/util/envUtils';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import Axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { FETCH_SERVICES } from './serviceConsts';

const url = `${getEnvVar('API_URL')}/services`;

export const fetchServices = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(url);
      const services = res.data;
      dispatch({
        type: FETCH_SERVICES,
        payload: { services },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Opps', 'Something went wrong');
    }
  };
};
