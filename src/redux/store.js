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
        updateStatusUser: (state, action) => {
            const user = state.users.find(user => user.id === action.payload.userId)

            if (user) {
                user.status = action.payload.status
            }
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
        },
        addMovie: (state, action) => {
            state.titles
                .find(title => title.id === action.payload.titleId)
                .movies.push(action.payload.movie)
        },
        deleteMovie: (state, action) => {
            state.titles
                .find(title => title.id === action.payload.titleId)
                .movies = [
                    ...state.titles
                        .find(title => title.id === action.payload.titleId)
                        .movies
                        .filter(movie => movie.id !== action.payload.movieId)
                ]
        },
        updateMovie: (state, action) => {
            const movie = state.titles
                .find(title => title.id === action.payload.titleId)
                .movies
                .find(movie => movie.id === action.payload.movieId);

            movie.name = action.payload.movie.name;
            movie.description = action.payload.movie.description;
            movie.picturePath = action.payload.movie.picturePath;
        },
        addTitle: (state, action) => {
            state.titles.push(action.payload.title)
        },
        updateTitle: (state, action) => {
            state.titles
                .find(title => title.id === action.payload.titleId)
                .name = action.payload.value
        },
        deleteTitle: (state, action) => {
            state.titles = [
                ...state.titles.filter(title => title.id !== action.payload.titleId)
            ]
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
    setSearch,
    addMovie,
    addTitle,
    deleteMovie,
    deleteTitle,
    updateTitle,
    updateMovie,
    updateStatusUser
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