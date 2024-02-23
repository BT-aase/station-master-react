import { GET_SERVICES } from "./types";

export const getServices = (crs) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3001/station/${crs}`);
      const data = await res.json();

      dispatch({
        type: GET_SERVICES,
        payload: {
          crs: crs,
          services: data.trains,
        },
      });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
};