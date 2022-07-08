import {configureStore} from '@reduxjs/toolkit';
import taskReducer from './reducers';
export default configureStore({
  reducer: {
    taskReducer,
  },
});
