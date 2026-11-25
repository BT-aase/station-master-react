import { FaBus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import "./StationService.scss";

const StationService = ({ service, setServiceId, type = "departures" }) => {
  const navigate = useNavigate();
  const isArrival = type === "arrivals";

  const handleServiceSelect = () => {
    const savedCode = sessionStorage.getItem("stationCode");
    const stationCode = savedCode ? JSON.parse(savedCode) : "";
    const time = isArrival ? service.arrivalTime : service.departTime;

    setServiceId(service.uniqueIdentity);

    sessionStorage.setItem(
      "selectedService",
      JSON.stringify(`${time} ${service.origin} to ${service.destination}`),
    );

    navigate(`/station/${stationCode}/service/${service.uniqueIdentity}`);
  };

  const statusColor = (status = "") => {
    if (status === "On Time") return "onTime";
    if (status.includes("Expected")) return "late";
    return "station";
  };

  const time = isArrival ? service.arrivalTime : service.departTime;

  return (
    <div
      className="service"
      onClick={handleServiceSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleServiceSelect();
        }
      }}
    >
      <div className="left">
        <div className="leftContainer">
          <div className="leftTop">
            <div className="time">{time || "Time unavailable"}</div>
            <div className={`status ${statusColor(service.status)}`}>
              {service.status}
            </div>
          </div>

          <div className="leftMiddle">
            {isArrival ? `from ${service.origin}` : `to ${service.destination}`}
          </div>

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
