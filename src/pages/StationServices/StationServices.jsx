import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import "./StationServices.scss";
import { getServices } from "../../redux/actions/stationActions";
import StationService from "../../components/StationServices/StationService";
import stations from "../../stations.json";

const StationServices = ({ setServiceId }) => {
  const dispatch = useDispatch();
  const { crs } = useParams();
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("departures");
  const services = useSelector((state) => state.station.services);
  const station = stations.find((item) => item.crs === crs);
  const stationName = station?.name;

  useEffect(() => {
    let active = true;

    setLoading(true);

    dispatch(getServices(crs, type)).finally(() => {
      if (active) {
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [crs, type, dispatch]);

  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: "#6ca572",
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
        <div className="headerAlign direction">
          {type === "departures" ? "Departing From:" : "Arriving At:"}
        </div>
        <div className="headerAlign station">{stationName}</div>
      </div>

      <div
        className="serviceTypeSelector"
        role="group"
        aria-label="Service direction"
      >
        <button
          type="button"
          aria-pressed={type === "departures"}
          onClick={() => setType("departures")}
        >
          Departures
        </button>
        <button
          type="button"
          aria-pressed={type === "arrivals"}
          onClick={() => setType("arrivals")}
        >
          Arrivals
        </button>
      </div>

      <div className="trainsContainer">
        {loading && (
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "90vw", maxWidth: "750px" }}>
              <LinearProgress sx={{ height: "10px", borderRadius: "10px" }} />
            </Box>
          </ThemeProvider>
        )}

        {!loading && (
          <div className="trains">
            {services.length > 0 ? (
              services.map((service, index) => (
                <StationService
                  key={service.uniqueIdentity || index}
                  service={service}
                  setServiceId={setServiceId}
                  type={type}
                />
              ))
            ) : (
              <div className="noServices">No services found at this time.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StationServices;
