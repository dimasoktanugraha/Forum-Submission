import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import detailThreadReducer from './detail/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
    detailThread: detailThreadReducer,
  },
});

export default store;
