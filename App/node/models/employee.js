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

export class EmployeeModel {
  static async getAll() {
    const [employees] = await connection.query("SELECT * FROM EMPLOYEE");

    return employees;
  }

  static async getById(id) {
    const [employees] = await connection.query(
      "SELECT * FROM EMPLOYEE WHERE id = ?",
      [id]
    );
    return employees[0];
  }

  static async getByUsername(username) {
    const [employees] = await connection.query(
      "SELECT * FROM EMPLOYEE WHERE username = ?",
      [username]
    );
    return employees[0];
  }

  static async getByDepartment(department) {
    const [employees] = await connection.query(
      "SELECT * FROM EMPLOYEE WHERE department_id = ?",
      [department]
    );
    return employees;
  }

  static async getPasswordByEmployeeId(employeeId) {
    const [password] = await connection.query(
      "SELECT value FROM PASSWORD WHERE employee_id = ?",
      [employeeId]
    );
    return password[0];
  }

  static async create(employee) {
    const result = await connection.query(
      "INSERT INTO EMPLOYEE (name, username, position, department) VALUES (?, ?, ?, ?)",
      [employee.name, employee.username, employee.position, employee.department]
    );
  }

  static async update(id, employee) {
    const { name, position, department } = employee;
    await connection.query(
      "UPDATE EMPLOYEE SET name = ?, position = ?, department = ? WHERE id = ?",
      [name, position, department, id]
    );
    return { id, ...employee };
  }

  static async delete(id) {
    const result = await connection.query("DELETE FROM EMPLOYEE WHERE ID = ?", [
      id,
    ]);
    return result[0].affectedRows > 0;
  }
  // Password
  static async updatePassword(employeeId, hash) {
    const result = await connection.query(
      "UPDATE PASSWORD SET value = ? WHERE employee_id = ?",
      [hash, employeeId]
    );
    return result;
  }

  // Record
  // create
  static async createRecord(timestamp, employeeId) {
    const result = await connection.query(
      "INSERT INTO RECORD (employee_id, timestamp) VALUES (?, ?)",
      [employeeId, timestamp]
    );
    return result;
  }

  // Get last record
  static async getLastRecord(employeeId) {
    const [record] = await connection.query(
      "SELECT timestamp FROM RECORD WHERE employee_id = ? ORDER BY timestamp DESC LIMIT 1",
      [employeeId]
    );
    return record[0];
  }

  // Change profile picture
  static async updateProfilePicture(employeeId, profilePicture, mimetype) {
    const result = await connection.query(
      "UPDATE EMPLOYEE SET picture = ?, mimetype = ? WHERE ID = ?",
      [profilePicture, mimetype, employeeId]
    );
    return result;
  }

  // Get profile picture
  static async getProfilePicture(employeeId) {
    const [profilePicture] = await connection.query(
      "SELECT picture, mimetype FROM EMPLOYEE WHERE ID = ?",
      [employeeId]
    );
    return profilePicture[0];
  }
}
