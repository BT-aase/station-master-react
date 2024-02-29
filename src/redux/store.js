import { configureStore, combineReducers } from "@reduxjs/toolkit";
import stationReducer from "./reducers/stationReducer";
import serviceReducer from "./reducers/serviceReducer";

const rootReducer = combineReducers({
  station: stationReducer,
  service: serviceReducer,
});

export default configureStore({
  reducer: rootReducer,
});
