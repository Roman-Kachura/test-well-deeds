import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CreateUsersDeedValuesType, deedsApi, RemoveUserDeedsValuesType} from '../../api/deedsApi';


const deedsInitialState: DeedsInitialStateType = {
    deeds: []
}

export const createUserDeed = createAsyncThunk('create-deed', async (arg: CreateUsersDeedValuesType, thunkAPI) => {
    try {
        const res = await deedsApi.createUserDeed(arg);
        thunkAPI.dispatch(addDeeds({deed: res.data}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const getUserDeeds = createAsyncThunk('get-deeds', async (arg: { uid: string }, thunkAPI) => {
    try {
        const res = await deedsApi.getUserDeeds(arg.uid);
        thunkAPI.dispatch(setDeeds(res.data));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const updateUserDeed = createAsyncThunk('update-deed', async (arg: DeedType, thunkAPI) => {
    try {
        await deedsApi.updateUserDeed(arg);
        thunkAPI.dispatch(updateDeed({deed: arg}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

export const removeUserDeed = createAsyncThunk('remove-deed', async (arg: RemoveUserDeedsValuesType, thunkAPI) => {
    try {
        await deedsApi.removeUserDeed(arg);
        thunkAPI.dispatch(removeDeed({id: arg.id}));
    } catch (e: any) {
        alert(e.response.data.message);
    }
});

const deedsSlice = createSlice({
    name: 'deeds',
    initialState: deedsInitialState,
    reducers: {
        setDeeds(state, action) {
            state.deeds = action.payload
        },
        addDeeds(state, action) {
            state.deeds.unshift(action.payload.deed);
        },
        updateDeed(state, action) {
            const newDeeds = state.deeds.map(d => d.id !== action.payload.deed.id ? d : {...d, text: action.payload.deed.text});
            state.deeds = newDeeds;
        },
        removeDeed(state, action) {
            const newDeeds = state.deeds.filter(d => d.id !== action.payload.id);
            state.deeds = newDeeds;
        }
    }
});

const {setDeeds, addDeeds, updateDeed, removeDeed} = deedsSlice.actions;

export default deedsSlice.reducer;

interface DeedsInitialStateType {
    deeds: DeedType[]
}

export interface DeedType {
    uid: string
    id: string
    text: string
}




