import { getEnvVar } from '../../app/util/envUtils';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import { FETCH_VENDORS } from './vendorConsts';
import Axios from 'axios';
import { toastr } from 'react-redux-toastr';

const url = `${getEnvVar('API_URL')}/vendors`;

export const fetchVendors = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      const res = await Axios.get(url);
      const vendors = res.data;
      dispatch({
        type: FETCH_VENDORS,
        payload: { vendors },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Opps', 'Something went wrong');
    }
  };
};
