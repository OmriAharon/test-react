import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from './reducers';

export default createStore(
  reducers,
  applyMiddleware(
    apiMiddleware
  )
);
