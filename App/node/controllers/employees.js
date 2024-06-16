import {
  validateEmployee,
  validatePartialEmployee,
} from "../schemas/employees.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class EmployeeController {
  constructor({ employeeModel }) {
    this.employeeModel = employeeModel;
  }

  // Login
  async login(req, res) {
    const { username, password } = req.body;
    console.log("username", username);
    const userDB = await this.employeeModel.getByUsername(username);
    if (!userDB) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const hashDB = await this.employeeModel.getPasswordByEmployeeId(userDB.ID);

    const validPassword = await bcrypt.compare(password, hashDB.value);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: userDB.id }, process.env.JWT_SECRET);

    res.json({ token, user: userDB });
  }

  //create Record
  // record (timestamp, employeeId)
  async createRecord(req, res) {
    const { timestamp, employeeId } = req.body;
    try {
      const newRecord = await this.employeeModel.createRecord(
        timestamp,
        employeeId
      );
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get last record
  async getLastRecord(req, res) {
    const { employeeId } = req.params;
    try {
      const record = await this.employeeModel.getLastRecord(employeeId);
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  // Update password
  async updatePassword(req, res) {
    const { newPassword, employeeId } = req.body;

    const userDB = await this.employeeModel.getById(employeeId);
    if (!userDB) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const validPassword = newPassword.length >= 8;

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    const result = await this.employeeModel.updatePassword(userDB.ID, hash);

    if (!result) {
      return res.status(500).json({ message: "Password not updated" });
    }

    res.json({ message: "Password updated" });
  }

  // Update profile picture
  async updateProfilePicture(req, res) {
    const { employeeId } = req.body;
    const image = req.file;

    if (!image || !employeeId) {
      return res
        .status(400)
        .json({ error: "Falta el campo de imagen o employeeId." });
    }

    try {
      const result = await this.employeeModel.updateProfilePicture(
        employeeId,
        image.buffer,
        image.mimetype
      );
      res.status(201).json({ message: "Imagen subida correctamente." });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  // Get profile picture
  async getProfilePicture(req, res) {
    const { employeeId } = req.body;

    const result = await this.employeeModel.getProfilePicture(employeeId);

    if (!result) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    const { picture, mimetype } = result;
    res.set("Content-Type", mimetype);
    res.send(picture);
  }

  // Getters
  async getAll(req, res) {
    try {
      const employees = await this.employeeModel.getAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const employee = await this.employeeModel.getById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found by id" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByDepartment(req, res) {
    const { department } = req.params;
    try {
      const employees = await this.employeeModel.getByDepartment(department);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create, update and remove
  async create(req, res) {
    const result = validateEmployee(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    try {
      const newEmployee = await this.employeeModel.create(result.data);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    const result = validatePartialEmployee(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    try {
      const updatedEmployee = await this.employeeModel.update(id, result.data);
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not updated" });
      }
      return res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    const { employeeId } = req.params;

    try {
      const result = await this.employeeModel.delete(employeeId);

      if (!result) {
        return res.status(404).json({ message: "Employee not removed" });
      }

      return res.json({ message: "Employee deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
