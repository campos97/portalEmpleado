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

export class DepartmentModel {
  static async getAll() {
    const [departments] = await connection.query("SELECT * FROM DEPARTMENT");
    return departments;
  }

  static async getById(id) {
    const [department] = await connection.query(
      "SELECT * FROM DEPARTMENT WHERE ID = ?",
      [id]
    );
    return department[0];
  }
}
