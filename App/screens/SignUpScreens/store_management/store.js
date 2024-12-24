import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import documentReducer from './reducers/documentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  documents: documentReducer,
});

const store = createStore(rootReducer);

export default store;