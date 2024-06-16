import React, { useEffect, useState } from "react";
import "./ScheduleToolBar.css";

const ScheduleToolBar = (props) => {
  const [hourType, setHourType] = useState("work-half-hour");
  
  const handleSelectHourType = (e) => {
    props.switchOffDelete();
    setHourType(e.target.className);
  };

  

  // Según el botón que se pulse, se devuelve un title u otro
  useEffect(() => {
    switch (hourType) {
      case "work-half-hour":
        props.setTitle("Work");
        break;
      case "compl-half-hour":
        props.setTitle("Complementary");
        break;
      case "extra-half-hour":
        props.setTitle("Extra");
        break;
      case "holi-half-hour":
        props.setTitle("Holidays");
        break;
      default:
        props.setTitle("Work");
        break;
    }
  }, [hourType, props]);

  return (
    <div className="schedule-tool-bar">
      <div>
        <ul>
          <li>
            <button className="delete-event-btn" onClick={props.switchDelete}>
              Delete
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul className="hour-type-list">
          <li>
            <button
              className="work-half-hour"
              onClick={handleSelectHourType}
              autoFocus
            >
              Work
            </button>
          </li>
          <li>
            <button className="compl-half-hour" onClick={handleSelectHourType}>
              Complementary
            </button>
          </li>
          <li>
            <button className="extra-half-hour" onClick={handleSelectHourType}>
              Extra
            </button>
          </li>
          <li>
            <button className="holi-half-hour" onClick={handleSelectHourType}>
              Holidays
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScheduleToolBar;
