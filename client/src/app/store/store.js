import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const middlewears = [thunk];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewears));

export const store = createStore(rootReducer, composedEnhancer);
