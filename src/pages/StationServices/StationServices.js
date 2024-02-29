import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import "./StationServices.scss";
import { getServices } from "../../redux/actions/stationActions";
import StationService from "../../components/StationServices/StationService";

const StationServices = ({ stationName, stationCode, setServiceId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const services = useSelector((state) => state.station.services);

  useEffect(() => {
    setLoading(true);
    dispatch(getServices(stationCode)).then(() => setLoading(false));
  }, [stationCode, dispatch]);

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
    <div className="services">
      <div className="header">
        <div className="headerAlign direction">Departing From: </div>
        <div className="headerAlign station">{stationName}</div>
      </div>
      <div className="trainsContainer">
        {loading && (
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "90vw", maxWidth: "750px" }}>
              <LinearProgress sx={{ height: "10px", borderRadius: "10px" }} />
            </Box>
          </ThemeProvider>
        )}
        <div>
          {!loading && (
            <div className="trains">
              {services && services.map((service, index) => (
                <StationService key={index} service={service} setServiceId={setServiceId}/>
              ))}
              {!services && <div className="noServices">No Services Found At This Time</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationServices;
