
import { GET_SERVICES } from "./types";

export const getServices = (crs, type = "departures") => {
  return async (dispatch) => {
    try {
      const url = new URL(`http://localhost:3001/station/${crs}`);

      if (type === "arrivals") {
        url.searchParams.set("type", "arrivals");
      }

      console.log("Fetching station services:", url.toString());

      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      console.log("Station services response:", data);

      dispatch({
        type: GET_SERVICES,
        payload: {
          crs,
          services: data.trains,
        },
      });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
};
