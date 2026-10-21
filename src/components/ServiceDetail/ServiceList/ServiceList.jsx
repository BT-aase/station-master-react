import { useState } from "react";
import "./ServiceList.scss";

const ServiceList = ({ service }) => {
  const [showPrior, setShowPrior] = useState(false);

  const displayTime = (scheduledTime, realTime, hasDeparted) => {
    if (!scheduledTime || !realTime || realTime === "Unknown") {
      return null;
    }

    if (
      parseInt(scheduledTime.replace(":", ""), 10) <
      parseInt(realTime.replace(":", ""), 10)
    ) {
      return (
        <div className="late">
          <span>
            {!hasDeparted && "Expected"} {realTime}
          </span>
        </div>
      );
    }

    return (
      <div className="onTime">
        <span>On Time</span>
      </div>
    );
  };

  const generateStop = (selector, color, action) => {
    const selection =
      typeof selector === "string" ? service[selector] : selector;

    console.log("sel", selection);

    const markerSize = typeof selector === "string" ? "1.875em" : "1.375em";
    const adjustMargin = typeof selector !== "string" ? "0.25em" : 0;

    return (
      <div className="contain">
        <div className="stopContainer">
          <div className="timeContainer">
            <span>{selection.bookedTime}</span>
            <div className={selection.status}>
              {typeof selection.hasDeparted !== "undefined"
                ? selection.hasDeparted && <span>Departed</span>
                : selection.hasArrived && <span>Arrived</span>}
              {displayTime(
                selection.bookedTime,
                selection.realTime,
                selection.hasDeparted,
              )}
            </div>
          </div>
          {selector !== "destination" && (
            <div
              className={`lineSegment ${color} ${
                selection.hasDeparted ? "departed" : "notDeparted"
              }`}
            />
          )}
          <div
            className={`stopMarker ${color}`}
            style={{
              "--marker-size": markerSize,
              "--adjust-margin": adjustMargin,
            }}
            onClick={action}
          />
        </div>
        <div className="stationContainer">
          <span className="stationName">{selection.name}</span>
          {selection.platform !== undefined && (
            <span>{`Platform ${selection.platform}`}</span>
          )}
        </div>
      </div>
    );
  };

  console.log("Service detail data:", service);

  return (
    <div className="map">
      {service["origin"].name !== service["selected"].name &&
        generateStop("origin", "before")}
      {showPrior &&
        service.priorStops.map((ps) => {
          return generateStop(ps, "before");
        })}
      {generateStop("selected", "after", () => setShowPrior(!showPrior))}
      {service.followingStops.map((fs) => {
        return generateStop(fs, "after");
      })}
      {generateStop("destination")}
    </div>
  );
};


export default ServiceList;
