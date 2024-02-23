import { GET_SERVICES } from "../actions/types";

const initialState = {
  station: "",
  services: [],
};

const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES: {
      return {
        ...state,
        station: action.payload.crs,
        services: action.payload.services,
      };
    }
    default:
      return state;
  }
};

export default stationReducer;

