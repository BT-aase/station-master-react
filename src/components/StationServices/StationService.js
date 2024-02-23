import "./StationService.scss";

const StationService = ({ service }) => {
  
  const statusColor = (status) => {
    if (status === "On Time") return "onTime";
    else if (status.includes("Expected")) return "late";
    else return "station";
  };

  return (
    <div className="service">
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
    </div>
  );
};

export default StationService;
