import { GET_SERVICE } from "../actions/types";

const initialState = {
  serviceId: "",
  serviceStops: [],
};

const serviceReducer = (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case GET_SERVICE: {
      return {
        ...state,
        serviceid: action.payload.id,
        serviceStops: action.payload.stops,
      };
    }
    default:
      return state;
  }
};

export default serviceReducer;
