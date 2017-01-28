import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import { setLanguage, defaultLanguage } from '../i18n';

// Pages
import Main from './Main';
import '../styles/app.scss';

// defaultLanguage: en
setLanguage(defaultLanguage);

export const App = () => {
  return (
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ Main }>
        </Route>
      </Router>
    </Provider>
  );
};
