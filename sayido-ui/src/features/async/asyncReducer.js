import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConsts";
import { createReducer } from "../../app/util/reducerUtils";

const initialState = {
    loading: false,
    element: null
};

const asyncActionStart = (state, payload) => {
    return {
        ...state,
        loading: true,
        element: payload
    }
}

const asyncActionFinish = (state, payload) => {
    return {
        ...state,
        loading: false,
        element: null
    }
}

const asyncActionError = (state, payload) => {
    return {
        ...state,
        loading: false,
        element: null
    }
}

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asyncActionStart,
    [ASYNC_ACTION_FINISH]: asyncActionFinish,
    [ASYNC_ACTION_ERROR]: asyncActionError,
});