import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import StationSelect from "./pages/StationSelect/StationSelect";
import stations from "./stations.json";
import StationServices from "./pages/StationServices/StationServices";

const App = () => {
  const [stationName, setStationName] = useState(() => {
    const savedName = localStorage.getItem("stationName");
    return savedName ? JSON.parse(savedName) : "";
  });

  const [stationCode, setStationCode] = useState(() => {
    const savedCode = localStorage.getItem("stationCode");
    return savedCode ? JSON.parse(savedCode) : "";
  });

  useEffect(() => {
    localStorage.setItem("stationName", JSON.stringify(stationName));
  }, [stationName]);

  useEffect(() => {
    localStorage.setItem("stationCode", JSON.stringify(stationCode));
  }, [stationCode]);

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
