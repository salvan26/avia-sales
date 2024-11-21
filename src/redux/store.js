/* eslint-disable prettier/prettier */ /* eslint-disable linebreak-style */

import { configureStore } from '@reduxjs/toolkit';

import rootReduce from './reducers/rootReduce';

const store = configureStore({
  reducer: rootReduce,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
