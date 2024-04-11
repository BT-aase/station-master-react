import { useState } from "react";
import "./ServiceMap.scss";

const ServiceMap = ({ service }) => {
  const [showPrior, setShowPrior] = useState(true);

  const displayTime = (scheduledTime, realTime) => {
    if (
      parseInt(scheduledTime.replace(":", "")) <
      parseInt(realTime.replace(":", ""))
    ) {
      return <div>Expected {realTime}</div>;
    } else {
      return <div>On Time</div>;
    }
  };

  const generateStop = (selector, color) => {
    const selection =
      typeof selector === "string" ? service[selector] : selector;

    const markerSize = typeof selector === "string" ? "1.875em" : "1.375em";
    const adjustMargin = typeof selector !== "string" ? "0.25em" : 0;

    return (
      <div className={`contain ${selector}`}>
        <div className="stopContainer">
          <div className="timeContainer">
            <div>{selection.bookedTime}</div>
            {displayTime(selection.bookedTime, selection.realTime)}
          </div>
          {selector !== "destination" && <div className={`lineSegment ${color}`} />}
          <div
            className={`stopMarker ${color}`}
            style={{ "--marker-size": markerSize, "--adjust-margin": adjustMargin }}
          />
        </div>
        <div className="stationContainer">
          <div>{selection.name}</div>
          {selection.platform !== undefined && (
            <div>{`Platform ${selection.platform}`}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="map">
      {generateStop("origin", "before")}
      {showPrior && service.priorStops.map((ps) => {
        return generateStop(ps, "before");
      })}
      {generateStop("selected", "after")}
      {service.followingStops.map((fs) => {
        return generateStop(fs, "after");
      })}
      {generateStop("destination")}
    </div>
  );
};

export default ServiceMap;
