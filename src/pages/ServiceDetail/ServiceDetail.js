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
  const [showPrior, setShowPrior] = useState(false);
  const service = useSelector((state) => state.service.service);

  const savedService = JSON.parse(sessionStorage.getItem("selectedService"));

  useEffect(() => {
    setLoading(true);
    dispatch(getService(stationCode, serviceId)).then(() => setLoading(false));
  }, [stationCode, serviceId, dispatch]);

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

  const priorPosition = (start, step, stops) => {
    return start + step * stops;
  };

  const drawJourney = (service, start) => {
    const addLength = (service) => {
      if (service.origin.name === service.selected.name) return 1;
      else if (service.priorStops.length === 0) return 2;
      else return 3;
    };

    const step = 75;

    const priorMarker = showPrior
      ? priorPosition(start, step, service.priorStops.length + 1)
      : start + step;

    const selPosition = (service) => {
      if (service.origin.name === service.selected.name) return start;
      else if (service.priorStops.length === 0) return start + step;
      else return start + step * 2;
    };

    const selected = showPrior
      ? priorPosition(start, step, service.priorStops.length + 2)
      : selPosition(service);

    let psPosition = start;
    let msPosition = selected;

    const stopLength = showPrior
      ? service.followingStops.length + service.priorStops.length
      : service.followingStops.length;
    const finish = start + (stopLength + addLength(service)) * 75;

    let priorStops = service.priorStops.map((stop) => {
      psPosition += step;
      return { ...stop, point: psPosition };
    });

    let midstops = service.followingStops.map((stop) => {
      msPosition += step;
      return { ...stop, point: msPosition };
    });

    let namePosition = (id, platform) => {
      return platform === undefined ? id + 5 : id;
    };

    console.log(midstops);

    return (
      <svg width="100%" height="100%" viewBox={`0 0 800 ${finish + 30}`}>
        {service.origin.name !== service.selected.name && (
          <>
            <line
              x1="75"
              y1={start}
              x2="75"
              y2={start + step}
              stroke="#6ca572"
              strokeWidth="7"
            />
            <text x="10" y={start}>
              {service.origin.bookedTime}
            </text>
            <circle
              cx="75"
              cy={start}
              r="13"
              fill="white"
              stroke="#6ca572"
              stroke-width="5"
            />
            <text x="95" y={namePosition(start, service.origin.platform)}>
              {service.origin.name}
            </text>
            {service.origin.platform !== undefined && (
              <text x="95" y={start + 15} fontSize="smaller">
                {`Platform ${service.origin.platform}`}
              </text>
            )}
          </>
        )}
        {showPrior && (
          <>
            {priorStops.map((ps) => (
              <>
                <line
                  x1="75"
                  y1={ps.point}
                  x2="75"
                  y2={ps.point + step}
                  stroke="#6ca572"
                  strokeWidth="7"
                />
                <text x="10" y={ps.point}>
                  {ps.bookedTime}
                </text>
                <circle
                  cx="75"
                  cy={namePosition(ps.point, ps.platform)}
                  r="8"
                  fill="white"
                  stroke="#6ca572"
                  stroke-width="5"
                />
                <text x="95" y={ps.point}>
                  {ps.name}
                </text>
                {ps.platform !== undefined && (
                  <text x="95" y={ps.point + 15} fontSize="smaller">
                    {`Platform ${ps.platform}`}
                  </text>
                )}
              </>
            ))}
          </>
        )}

        {service.priorStops.length > 0 && (
          <>
            <line
              x1="75"
              y1={priorMarker}
              x2="75"
              y2={priorMarker + step}
              stroke="#6ca572"
              strokeWidth="7"
            />
            <circle
              cx="75"
              cy={priorMarker}
              r="10"
              fill="#6ca572"
              onClick={() =>
                showPrior ? setShowPrior(false) : setShowPrior(true)
              }
            />
            <text x="95" y={priorMarker + 5}>
              {`${service.priorStops.length} ${
                service.priorStops.length === 1 ? "Stop" : "Stops"
              }`}
            </text>
          </>
        )}
        {/* Draw selected stop */}
        <line
          x1="75"
          y1={selected}
          x2="75"
          y2={selected + step}
          stroke="#0b6a14"
          strokeWidth="7"
        />
        <text x="10" y={selected}>
          {service.selected.bookedTime}
        </text>
        <text x="10" y={selected + 15}>
          {service.selected.realTime}
        </text>
        <circle cx="75" cy={selected} r="13" fill="black" />
        <text x="95" y={namePosition(selected, service.selected.platform)}>
          {service.selected.name}
        </text>
        {service.selected.platform !== undefined && (
          <text x="95" y={selected + 15} fontSize="smaller">
            {`Platform ${service.selected.platform}`}
          </text>
        )}

        {midstops.map((ms) => (
          <>
            <line
              x1="75"
              y1={ms.point}
              x2="75"
              y2={ms.point + step}
              stroke="#0b6a14"
              strokeWidth="7"
            />
            <text x="10" y={ms.point}>
              {ms.bookedTime}
            </text>
            <circle cx="75" cy={ms.point} r="10" fill="black" />
            <text x="95" y={namePosition(ms.point, ms.platform)}>
              {ms.name}
            </text>
            {ms.platform !== undefined && (
              <text x="95" y={ms.point + 15} fontSize="smaller">
                {`Platform ${ms.platform}`}
              </text>
            )}
          </>
        ))}

        {/* Draw end point */}
        <text x="10" y={finish}>
          {service.destination.bookedTime}
        </text>
        <circle cx="75" cy={finish} r="13" fill="black" />
        <text x="95" y={namePosition(finish, service.destination.platform)}>
          {service.destination.name}
        </text>
        {service.destination.platform !== undefined && (
          <text x="95" y={finish + 15} fontSize="smaller">
            {`Platform ${service.destination.platform}`}
          </text>
        )}
      </svg>
    );
  };

  return (
    <div className="detail">
      <div className="header">{savedService}</div>
      <div className="journeyContainer">
        {loading && (
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "90vw", maxWidth: "750px" }}>
              <LinearProgress sx={{ height: "10px", borderRadius: "10px" }} />
            </Box>
          </ThemeProvider>
        )}
        {!loading && <div className="journey">{drawJourney(service, 30)}</div>}
      </div>
    </div>
  );
};

export default ServiceDetail;
