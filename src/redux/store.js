import { configureStore, combineReducers } from "@reduxjs/toolkit";
import stationReducer from "./reducers/stationReducer";

const rootReducer = combineReducers({
    station: stationReducer
})

export default configureStore({
    reducer: rootReducer
});
