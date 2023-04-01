import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {useDispatch} from 'react-redux';
import authReducer from './reducers/authReducer';
import deedsReducer from './reducers/deedsReducer';
import usersReducer from './reducers/usersReducer';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        deeds: deedsReducer,
        users:usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
});


export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;