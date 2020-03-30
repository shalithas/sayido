import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

export const configureStore = () => {
    const middlewears = [thunk];

    const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewears));

    return createStore(rootReducer, composedEnhancer);
}