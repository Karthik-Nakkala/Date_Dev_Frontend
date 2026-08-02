import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import connectionReducer from './slices/connectionSlice';
import feedReducer from './slices/feedSlice';
import requests from './slices/requestsSlice';

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requests,
    },
});

export default appStore;