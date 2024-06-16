import React, { useState, useEffect } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";

import "react-big-calendar/lib/css/react-big-calendar.css";

const HourGrid = (props) => {
  const [events, setEvents] = useState([{}]);

  const localizer = momentLocalizer(moment);

  // Obtener los eventos de la base de datos a partir de props.empoloyeeId
  const fetchEvents = async () => {
    fetch("http://localhost:3000/events/5") // Ajusta la URL según sea necesario
      .then((response) => response.json())
      .then((data) => {
        // Convertir las fechas de los eventos
        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
        console.log("Events loaded", formattedEvents); // Verificar los eventos cargados
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

  // Componente personalizado para mostrar los eventos
  // Asignar un color a cada tipo de evento

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

  return (
    <div>
      <div>
        <Calendar
          localizer={localizer}
          style={{
            height: "50vh",
            width: "30vw",
            margin: "auto",
          }}
          min={new Date(2017, 10, 0, 10, 0, 0)}
          max={new Date(2017, 10, 0, 22, 0, 0)}
          events={events}
          defaultView="week"
          components={components}
          resizable
          toolbar={false}
          popup={true}
          popupOffset={{ x: 30, y: 20 }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    </div>
  );
};

export default HourGrid;
