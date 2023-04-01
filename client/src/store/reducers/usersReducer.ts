import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setFriend, UserType} from './authReducer';
import {AddUserToFriendValuesType, usersApi} from '../../api/usersApi';


const usersInitialState: UsersInitialStateType = {
    currentUser: {} as UserType,
    searchUser: {} as UserType
}

export const getUserThunk = createAsyncThunk('get-user', async (arg: { uid: string }, thunkAPI) => {
    try {
        const res = await usersApi.getUser(arg.uid);
        thunkAPI.dispatch(setCurrentUser({user: res.data}));
        thunkAPI.dispatch(setSearchUser({user: {}}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const searchUserThunk = createAsyncThunk('search-user', async (arg: { nick: string }, thunkAPI) => {
    try {
        const res = await usersApi.searchUser(arg.nick);
        thunkAPI.dispatch(setSearchUser({user: res.data}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const addUserToFriendThunk = createAsyncThunk('add-user', async (arg: AddUserToFriendValuesType, thunkAPI) => {
    try {
        await usersApi.addUserToFriend(arg);
        thunkAPI.dispatch(setFriend({uid:arg.uid}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});


const usersSlice = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload.user
        },
        setSearchUser(state, action) {
            state.searchUser = action.payload.user;
        }
    }
});

export const {setCurrentUser, setSearchUser} = usersSlice.actions;

export default usersSlice.reducer;

interface UsersInitialStateType {
    currentUser: UserType
    searchUser: UserType
}




