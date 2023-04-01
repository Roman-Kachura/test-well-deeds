import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi} from '../../api/authApi';


const authInitialState: AuthInitialStateType = {
    isAuth: false,
    user: {} as UserType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: RegistrationValuesType, thunkAPI) => {
    try {
        const res = await authApi.registration(arg);
        thunkAPI.dispatch(setState({isAuth: true, user: res.data}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const loginThunk = createAsyncThunk('login', async (arg: LoginValuesType, thunkAPI) => {
    try {
        const res = await authApi.login(arg);
        thunkAPI.dispatch(setState({isAuth: true, user: res.data}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const logoutThunk = createAsyncThunk('logout', async (arg: { id: string }, thunkAPI) => {
    try {
        const res = await authApi.logout(arg);
        thunkAPI.dispatch(setState({isAuth: false, user: res.data}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setState(state, action) {
            state.isAuth = action.payload.isAuth;
            state.user = action.payload.user;
        },
        setFriend(state, action) {
            console.log(action.payload)
            state.user.friends.push(action.payload.uid);
        }
    }
});

export const {setState, setFriend} = authSlice.actions;

export default authSlice.reducer;

interface AuthInitialStateType {
    isAuth: boolean
    user: UserType
}

export interface UserType {
    email: string
    name: string
    token: string
    nick: string
    friends: string[]
    uid: string
}


export interface RegistrationValuesType {
    email: string
    password: string
    name: string
    nick: string
}

export interface LoginValuesType {
    email: string
    password: string
}

export interface LogoutValuesType {
    id: string
}


