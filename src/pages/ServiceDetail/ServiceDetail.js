import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import "./ServiceDetail.scss";
import { getService } from "../../redux/actions/serviceActions";
import ServiceMap from "../../components/ServiceDetail/ServiceMap";

const ServiceDetail = ({ stationCode, serviceId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
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

  // const priorPosition = (start, step, stops) => {
  //   return start + step * stops;
  // };

  // const drawJourney = (service, start) => {
  //   const addLength = (service) => {
  //     if (service.origin.name === service.selected.name) return 1;
  //     else if (service.priorStops.length === 0) return 2;
  //     else return 3;
  //   };

  //   const step = 90;

  //   const priorMarker = showPrior
  //     ? priorPosition(start, step, service.priorStops.length + 1)
  //     : start + step;

  //   const selPosition = (service) => {
  //     if (service.origin.name === service.selected.name) return start;
  //     else if (service.priorStops.length === 0) return start + step;
  //     else return start + step * 2;
  //   };

  //   const selected = showPrior
  //     ? priorPosition(start, step, service.priorStops.length + 2)
  //     : selPosition(service);

  //   let psPosition = start;
  //   let msPosition = selected;

  //   const stopLength = showPrior
  //     ? service.followingStops.length + service.priorStops.length
  //     : service.followingStops.length;
  //   const finish = start + (stopLength + addLength(service)) * 90;

  //   let priorStops = service.priorStops.map((stop) => {
  //     psPosition += step;
  //     return { ...stop, point: psPosition };
  //   });

  //   let midstops = service.followingStops.map((stop) => {
  //     msPosition += step;
  //     return { ...stop, point: msPosition };
  //   });

  //   let namePosition = (id, platform) => {
  //     return platform === undefined ? id + 5 : id;
  //   };

  //   const displayTime = (scheduledTime, realTime, point) => {
  //     if (
  //       parseInt(scheduledTime.replace(":", "")) <
  //       parseInt(realTime.replace(":", ""))
  //     ) {
  //       return (
  //         <text x="10" y={point} fill="red" stroke="red" strokeWidth={1}>
  //           <tspan x="10" dy="20">
  //             Expected
  //           </tspan>
  //           <tspan x="10" dy="20">
  //             {realTime}
  //           </tspan>
  //         </text>
  //       );
  //     } else {
  //       return (
  //         <text
  //           x="10"
  //           y={point + 18}
  //           fill="green"
  //           stroke="green"
  //           strokeWidth={1}
  //         >
  //           On Time
  //         </text>
  //       );
  //     }
  //   };

  //   return (
  //     <svg width="100%" height="100%" viewBox={`0 0 800 ${finish + 30}`}>
  //       {service.origin.name !== service.selected.name && (
  //         <>
  //           <line
  //             x1="90"
  //             y1={start}
  //             x2="90"
  //             y2={start + step}
  //             stroke="#6ca572"
  //             strokeWidth="7"
  //           />
  //           <text x="10" y={start} stroke="black" strokeWidth={1}>
  //             {service.origin.bookedTime}
  //           </text>
  //           {displayTime(
  //             service.origin.bookedTime,
  //             service.origin.realTime,
  //             start
  //           )}
  //           <circle
  //             cx="90"
  //             cy={start}
  //             r="13"
  //             fill="white"
  //             stroke="#6ca572"
  //             strokeWidth="5"
  //           />
  //           <text x="115" y={namePosition(start, service.origin.platform)}>
  //             {service.origin.name}
  //           </text>
  //           {service.origin.platform !== undefined && (
  //             <text x="115" y={start + 15} fontSize="smaller">
  //               {`Platform ${service.origin.platform}`}
  //             </text>
  //           )}
  //         </>
  //       )}
  //       {showPrior && (
  //         <>
  //           {priorStops.map((ps) => (
  //             <>
  //               <line
  //                 x1="90"
  //                 y1={ps.point}
  //                 x2="90"
  //                 y2={ps.point + step}
  //                 stroke="#6ca572"
  //                 strokeWidth="7"
  //               />
  //               <text x="10" y={ps.point} stroke="black" strokeWidth={1}>
  //                 {ps.bookedTime}
  //               </text>
  //               {displayTime(ps.bookedTime, ps.realTime, ps.point)}
  //               <circle
  //                 cx="90"
  //                 cy={namePosition(ps.point, ps.platform)}
  //                 r="8"
  //                 fill="white"
  //                 stroke="#6ca572"
  //                 strokeWidth="5"
  //               />
  //               <text x="115" y={ps.point}>
  //                 {ps.name}
  //               </text>
  //               {ps.platform !== undefined && (
  //                 <text x="115" y={ps.point + 15} fontSize="smaller">
  //                   {`Platform ${ps.platform}`}
  //                 </text>
  //               )}
  //             </>
  //           ))}
  //         </>
  //       )}

  //       {service.priorStops.length > 0 && (
  //         <>
  //           <line
  //             x1="90"
  //             y1={priorMarker}
  //             x2="90"
  //             y2={priorMarker + step}
  //             stroke="#6ca572"
  //             strokeWidth="7"
  //           />
  //           <circle
  //             cx="90"
  //             cy={priorMarker}
  //             r="10"
  //             fill="#6ca572"
  //             onClick={() =>
  //               showPrior ? setShowPrior(false) : setShowPrior(true)
  //             }
  //           />
  //           <text x="115" y={priorMarker + 5}>
  //             {`${service.priorStops.length} ${
  //               service.priorStops.length === 1 ? "Stop" : "Stops"
  //             }`}
  //           </text>
  //         </>
  //       )}
  //       {/* Draw selected stop */}
  //       <line
  //         x1="90"
  //         y1={selected}
  //         x2="90"
  //         y2={selected + step}
  //         stroke="#0b6a14"
  //         strokeWidth="7"
  //       />
  //       <text x="10" y={selected} stroke="black" strokeWidth={1}>
  //         {service.selected.bookedTime}
  //       </text>
  //       {displayTime(
  //         service.selected.bookedTime,
  //         service.selected.realTime,
  //         selected
  //       )}
  //       <circle cx="90" cy={selected} r="13" fill="black" />
  //       <text x="115" y={namePosition(selected, service.selected.platform)}>
  //         {service.selected.name}
  //       </text>
  //       {service.selected.platform !== undefined && (
  //         <text x="115" y={selected + 15} fontSize="smaller">
  //           {`Platform ${service.selected.platform}`}
  //         </text>
  //       )}

  //       {midstops.map((ms) => (
  //         <>
  //           <line
  //             x1="90"
  //             y1={ms.point}
  //             x2="90"
  //             y2={ms.point + step}
  //             stroke="#0b6a14"
  //             strokeWidth="7"
  //           />
  //           <text x="10" y={ms.point} stroke="black" strokeWidth={1}>
  //             {ms.bookedTime}
  //           </text>
  //           {displayTime(ms.bookedTime, ms.realTime, ms.point)}
  //           <circle cx="90" cy={ms.point} r="10" fill="black" />
  //           <text x="115" y={namePosition(ms.point, ms.platform)}>
  //             {ms.name}
  //           </text>
  //           {ms.platform !== undefined && (
  //             <text x="115" y={ms.point + 15} fontSize="smaller">
  //               {`Platform ${ms.platform}`}
  //             </text>
  //           )}
  //         </>
  //       ))}

  //       {/* Draw end point */}
  //       <text x="10" y={finish} stroke="black" strokeWidth={1}>
  //         {service.destination.bookedTime}
  //       </text>
  //       {displayTime(
  //         service.destination.bookedTime,
  //         service.destination.realTime,
  //         finish
  //       )}
  //       <circle cx="90" cy={finish} r="13" fill="black" />
  //       <text x="115" y={namePosition(finish, service.destination.platform)}>
  //         {service.destination.name}
  //       </text>
  //       {service.destination.platform !== undefined && (
  //         <text x="115" y={finish + 15} fontSize="smaller">
  //           {`Platform ${service.destination.platform}`}
  //         </text>
  //       )}
  //     </svg>
  //   );
  // };

  return (
    <div className="detail">
      <div className="header">{savedService}</div>
      <div className="journeyContainer">
        {loading && (
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "90vw", maxWidth: "900px" }}>
              <LinearProgress sx={{ height: "10px", borderRadius: "10px" }} />
            </Box>
          </ThemeProvider>
        )}
        {/* {!loading && <div className="journey">{drawJourney(service, 30)}</div>} */}
        {!loading && (
          <div className="journey">
            <ServiceMap service={service} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
