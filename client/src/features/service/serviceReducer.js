import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_SERVICES } from "./serviceConsts";

const intialState = {
    list: []
};

const fetchServices = (state, payload) => {
    return {
        ...state,
        list: payload.services
    };
}

export default createReducer(intialState, {
    [FETCH_SERVICES]: fetchServices
});