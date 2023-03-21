import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {
    persistReducer
} from "redux-persist";

// const movie = {
//     name: '...',
//     title: '...',
//     description: '',
//     evaluates: []
// }

const initState = {
    user: null,
    movies: []
}

const slice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        }
    }
});

export const {
    setLogin,
    setLogout
} = slice.actions;

const sliceReducer = slice.reducer;

const persistConfig = { key: 'movieApp', storage, version: 1, whitelist: ['user', 'movies'] };
const persistedReducer = persistReducer(persistConfig, sliceReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;