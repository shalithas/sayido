import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_VENDORS } from "./vendorConsts";

const intialState = {
    list: []
};

const fetchVendors = (state, payload) => {
    return {
        ...state,
        list: payload.vendors
    };
}

export default createReducer(intialState, {
    [FETCH_VENDORS]: fetchVendors
});