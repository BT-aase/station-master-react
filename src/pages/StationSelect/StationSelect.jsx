import { useNavigate } from "react-router-dom";

import "./StationSelect.scss";
import StationSelectDropdown from "../../components/StationSelect/StationSelectDropdown";

const StationSelect = ({stations, setStationName, setStationCode}) => {
  const navigate = useNavigate();

  const options = stations.map((station) => ({
    name: station.name,
    crs: station.crs,
  }));

  const handleStationSelect = (stationName, stationCode) => {
    setStationName(stationName);
    setStationCode(stationCode)
    navigate(`/station/${stationCode}`);
  };

  return (
    <div className="container">
      <div className="description">
        <div className="descriptionText">Select Your Station:</div>
      </div>
      <div className="dropdown">
        <StationSelectDropdown options={options} handleSelect={handleStationSelect}/>
      </div>
    </div>
  );
};

export default StationSelect;
