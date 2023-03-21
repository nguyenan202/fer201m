import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {
    persistReducer
} from "redux-persist";
import data from '../data.json';

const initState = {
    user: null,
    titles: [...data.titles],
    users: [...data.users],
    notification: null,
    searchValue: ''
}

const slice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
        },
        setLogout: (state) => {
            state.user = null
        },
        addUserRegister: (state, action) => {
            state.users = [
                ...state.users,
                action.payload.user
            ]
        },
        setNotification: (state, action) => {
            state.notification = action.payload.value
        },
        addRates: (state, action) => {
            state.titles
            .find(title => title.id === action.payload.titleId)
            .movies.find(movie => movie.id === action.payload.movieId)
            .rates.push(action.payload.rate)
        },
        saveRate: (state, action) => {

            const rate = state.titles
            .find(title => title.id === action.payload.titleId)
            .movies.find(movie => movie.id === action.payload.movieId)
            .rates
            .find(rate => rate.id === action.payload.rate.id);

            rate.comment = action.payload.rate.comment;
            rate.score = action.payload.rate.score;

        },
        setSearch: (state, action) => {
            state.searchValue = action.payload.value
        }
    }
});

export const {
    setLogin,
    setLogout,
    addUserRegister,
    setNotification,
    addRates,
    saveRate,
    setSearch
} = slice.actions;

const sliceReducer = slice.reducer;

const persistConfig = { key: 'movieApp', storage, version: 1, whitelist: ['user', 'titles', 'users'] };
const persistedReducer = persistReducer(persistConfig, sliceReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;