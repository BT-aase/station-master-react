import { GET_SERVICE } from "./types";

export const getService = (crs, id) => {
    return async (dispatch) => {
      try {
        const res = await fetch(`http://localhost:3001/station/${crs}/service/${id}`);
        const data = await res.json();


        console.log('data', data)
  
        dispatch({
          type: GET_SERVICE,
          payload: {
            id: id,
            service: data.service,
          },
        });
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
  };