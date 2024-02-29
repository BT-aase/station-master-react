import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import "./ServiceDetail.scss";
import { getService } from "../../redux/actions/serviceActions";

const ServiceDetail = ({ stationCode, serviceId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const stops = useSelector((state) => state.service.serviceStops);
  const selectedStation = JSON.parse(sessionStorage.getItem("stationName"));
  const savedService = JSON.parse(sessionStorage.getItem("selectedService"));

  useEffect(() => {
    setLoading(true);
    dispatch(getService(stationCode, serviceId)).then(() => setLoading(false));
  }, [stationCode, serviceId, dispatch]);

  console.log(stops);

  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: "#6ca572", // Set your custom color here
          },
          bar: {
            backgroundColor: "#0b6a14",
          },
        },
      },
    },
  });

  return (
    <div className="detail">
      <div className="header">
        {savedService.slice(0, 6) + selectedStation + savedService.slice(5)}
      </div>
      <div className="journeyContainer">
        {loading && (
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "90vw", maxWidth: "750px" }}>
              <LinearProgress sx={{ height: "10px", borderRadius: "10px" }} />
            </Box>
          </ThemeProvider>
        )}
        {!loading && (
          <div className="journey">
            <svg width="1000" height="500">
              <line
                x1="20"
                y1="20"
                x2="20"
                y2="450"
                stroke="black"
                strokeWidth="5"
              />

              {/* Draw start point */}
              <circle cx="20" cy="20" r="15" fill="black" />
              <text x="40" y="25">
                {stops[0].name}
              </text>

              {/* Draw end point */}
              <circle cx="20" cy="450" r="15" fill="black" />
              <text x="40" y="455">
                {stops[stops.length - 1].name}
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
