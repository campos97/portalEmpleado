import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: "db",
  user: "root",
  port: 3306,
  password: "root",
  database: "tfg",
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;
const connection = await mysql.createConnection(connectionString);

export class EventModel {
  static async getEventsByEmployeeId(employeeId) {
    console.log(employeeId);
    const [events] = await connection.query(
      "SELECT * FROM EVENT WHERE employee_id = ?",
      [employeeId]
    );
    return events;
  }

  static async create(event) {
    console.log(event.title, event.start, event.end, event.employeeId);
    try {
      const [result] = await connection.query(
        "INSERT INTO EVENT (title, start, end, employee_id) VALUES (?, ?, ?, ?)",
        [event.title, event.start, event.end, event.employeeId]
      );
      return result;
    } catch (error) {
      console.error("Error inserting event:", error);
      throw error; // Rethrow the error to be caught by the controller
    }
  }

  static async remove(eventId) {
    try {
      const [result] = await connection.query(
        "DELETE FROM EVENT WHERE ID = ?",
        [eventId]
      );
      return result;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error; // Rethrow the error to be caught by the controller
    }
  }
}
