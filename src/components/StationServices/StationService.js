import { FaBus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import "./StationService.scss";

const StationService = ({ service, setServiceId }) => {
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    const savedCode = sessionStorage.getItem("stationCode");
    setServiceId(service.serviceId);
    sessionStorage.setItem(
      "selectedService",
      JSON.stringify(
        `${service.departTime} ${service.origin} to ${service.destination}`
      )
    );
    navigate(`/station/${savedCode}/service/${service.serviceId}`);
  };

  const statusColor = (status) => {
    if (status === "On Time") return "onTime";
    else if (status.includes("Expected")) return "late";
    else return "station";
  };

  return (
    <div className="service" onClick={() => handleServiceSelect(service)}>
      <div className="left">
        <div className="leftContainer">
          <div className="leftTop">
            <div className="time">{service.departTime}</div>
            <div className={`status ${statusColor(service.status)}`}>
              {service.status}
            </div>
          </div>
          <div className="leftMiddle">to {service.destination}</div>
          <div className="leftBottom">{service.operator}</div>
        </div>
      </div>
      <div className="right">
        {service.platform && (
          <div className="platform">
            <div>Platform</div>
            <div className="platNumber">{service.platform}</div>
          </div>
        )}
        {service.serviceType === "bus" && (
          <div className="iconBox">
            <FaBus className="icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StationService;
