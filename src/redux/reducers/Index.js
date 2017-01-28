import { combineReducers } from 'redux';
import { clothesReducer } from './ClothesReducer';

const reducers = combineReducers({
  clothes: clothesReducer
});

export default reducers;
