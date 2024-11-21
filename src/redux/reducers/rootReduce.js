/* eslint-disable prettier/prettier */ /* eslint-disable linebreak-style */

import { combineReducers } from 'redux';

import * as reducers from './tiket-reducer';

const rootReduce = combineReducers({
  tickets: reducers.ticketReducer,
  searchId: reducers.searchIdReducer,
});

export default rootReduce;
