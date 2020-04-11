import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { store } from './app/store/store';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Axios from 'axios';
import { getEnvVar } from './app/util/envUtils';

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
        />
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

// TODO: remove after login implementation 
const token = getEnvVar('TOKEN');

Axios.defaults.headers.common = {
  'x-auth-token': token
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
