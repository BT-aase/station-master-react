import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import StationSelect from "./pages/StationSelect/StationSelect";
import stations from "./stations.json";
import StationServices from "./pages/StationServices/StationServices";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";

const App = () => {
  const [stationName, setStationName] = useState(() => {
    const savedName = sessionStorage.getItem("stationName");
    return savedName ? JSON.parse(savedName) : "";
  });

  const [stationCode, setStationCode] = useState(() => {
    const savedCode = sessionStorage.getItem("stationCode");
    return savedCode ? JSON.parse(savedCode) : "";
  });

  const [serviceId, setServiceId] = useState(() => {
    const savedId = sessionStorage.getItem("serviceId");
    return savedId ? JSON.parse(savedId) : "";
  });

  useEffect(() => {
    sessionStorage.setItem("stationName", JSON.stringify(stationName));
  }, [stationName]);

  useEffect(() => {
    sessionStorage.setItem("stationCode", JSON.stringify(stationCode));
  }, [stationCode]);

  useEffect(() => {
    sessionStorage.setItem("serviceId", JSON.stringify(serviceId));
  }, [serviceId]);

  return (
    <>
      <div className="navBar">
        <h1>STATION MASTER</h1>
      </div>
      <div className="body">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <StationSelect
                  stations={stations}
                  setStationName={setStationName}
                  setStationCode={setStationCode}
                />
              }
            />
            <Route
              path="/station/:crs"
              element={
                <StationServices
                  stationName={stationName}
                  stationCode={stationCode}
                  setServiceId={setServiceId}
                />
              }
            />
            <Route
              path="/station/:crs/service/:id"
              element={
                <ServiceDetail
                  stationCode={stationCode}
                  serviceId={serviceId}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
