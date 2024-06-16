import React, { useState, useEffect } from "react";

import ScheduleToolBar from "./ScheduleToolBar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./HourGrid.css";

const HourGrid = (props) => {
  const [events, setEvents] = useState([{}]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const switchDelete = () => {
    setIsDelete(!isDelete);
  };
  const switchOffDelete = () => {
    setIsDelete(false);
  };
const [isEdit, setIsEdit] = useState(false);
const switchEdit = () => {
  setIsEdit(!isEdit);
};
const switchOffEdit = () => {
  setIsEdit(false);
  };
  
  const localizer = momentLocalizer(moment);

  // Obtener los eventos de la base de datos a partir de props.empoloyeeId
  const fetchEvents = async () => {
    console.log(props.employee);
    fetch("http://localhost:3000/events/" + props.employee.ID) // Ajusta la URL según sea necesario
      .then((response) => response.json())
      .then((data) => {
        // Convertir las fechas de los eventos
        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventColor = (event) => {
    switch (event.title) {
      case "Work":
        return "#ab9cf0";
      case "Complementary":
        return "#f09ce4";
      case "Extra":
        return "#f09c9c";
      case "Holidays":
        return "#9cf0a0";
      default:
        return "#ab9cf0";
    }
  };
  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: eventColor(event),
      },
    };
  };

  const components = {
    event: (props) => {
      return (
        <div
          {...props}
          style={{
            borderRadius: "0px",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
        >
          {props.title}
        </div>
      );
    },
  };

  // Añadir evento a la base de datos
  const addEvent = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/addEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        fetchEvents();
      }
    } catch (error) {
      console.error("There was a problem adding the event:", error);
    }
  };

  // delete event
  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch("http://localhost:3000/events/delete/" + eventId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        fetchEvents();
      }
    } catch (error) {
      console.error("There was a problem deleting the event:", error);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setStart(start);
    setEnd(end);

    const newEvent = { title, start, end, employeeId: props.employee.ID };
    addEvent(newEvent);
  };

  const handleEventSelection = (e) => {
    if (isDelete) {
      deleteEvent(e.id);
    } 
    fetchEvents();
  };

  return (
    <div>
      <div>
        <h2>Horario de {props.employee.name}</h2>
        <ScheduleToolBar
          setTitle={setTitle}
          switchDelete={switchDelete}
          switchOffDelete={switchOffDelete}
        />
        <Calendar
          localizer={localizer}
          style={{ height: 500 }}
          events={events}
          defaultView="week"
          components={components}
          resizable
          draggableAccessor={(event) => true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventSelection}
          selectable
          popup={true}
          popupOffset={{ x: 30, y: 20 }}
          eventPropGetter={eventPropGetter}
          min={new Date(2017, 10, 0, 10, 0, 0)}
          max={new Date(2017, 10, 0, 22, 0, 0)}
        />
      </div>
    </div>
  );
};

export default HourGrid;
