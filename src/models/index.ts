import { configureStore } from '@reduxjs/toolkit';
import feedRecordReducer from './modules/feedRecordslice';


import middlewares from './middlewares';

const store = configureStore({
  reducer: {
    feedRecord: feedRecordReducer,
  },
  /**
   * toolkit默认有检测serializable的中间件 state.theme有很多函数 会导致serializable检测的报错 是否考虑重新对theme的组织？
   * https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
   */
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
