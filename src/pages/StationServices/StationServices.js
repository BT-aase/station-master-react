import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./StationServices.scss";
import { getServices } from "../../redux/actions/stationActions";
import StationService from "../../components/StationServices/StationService";

const StationServices = ({ stationName, stationCode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const services = useSelector((state) => state.station.services);

  console.log(services);

  useEffect(() => {
    setLoading(true);
    dispatch(getServices(stationCode)).then(() => setLoading(false));
  }, [stationCode, dispatch]);

  return (
    <div className="services">
      <div className="header">
        <div className="headerAlign direction">Departing From: </div>
        <div className="headerAlign station">{stationName}</div>
      </div>
      <div className="trainsContainer">
        {loading && <div>Loading...</div>}
        <div>
          {!loading && (
            <div className="trains">
              {services.map((service, index) => (
                <StationService key={index} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationServices;
