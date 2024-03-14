import { GET_SERVICE } from "../actions/types";

const initialState = {
  serviceId: "",
  service: [],
};

const serviceReducer = (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case GET_SERVICE: {
      return {
        ...state,
        serviceid: action.payload.id,
        service: action.payload.service,
      };
    }
    default:
      return state;
  }
};

export default serviceReducer;
