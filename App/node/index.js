import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "./middlewares/cors.js";
import { EmployeeController } from "./controllers/employees.js";
import { EmployeeModel } from "./models/employee.js";
import { DepartmentController } from "./controllers/departments.js";
import { DepartmentModel } from "./models/department.js";
import { EventController } from "./controllers/events.js";
import { EventModel } from "./models/event.js";
import {verifyToken} from "./middlewares/jwt.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



// Middlewares
app.use(cors);
app.use(bodyParser.json());
app.use(logger("dev"));

// Aumentar el límite para solicitudes JSON
app.use(express.json({ limit: '50mb' }));

// Aumentar el límite para solicitudes URL encoded
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const employeeController = new EmployeeController({
  employeeModel: EmployeeModel,
});
const eventController = new EventController({
  eventModel: EventModel,
});
const departmentController = new DepartmentController({
  departmentModel: DepartmentModel,
});

// LOGIN
app.post("/login", async (req, res) => employeeController.login(req, res));

// ACCOUNT SETTINGS
// update password
app.put("/account/changePassword", async (req, res) =>
  employeeController.updatePassword(req, res)
);

// FILES
// Configuración de multer para cargar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// change profile picture
app.post(
  "/account/changeProfilePicture",
  upload.single("file"),
  async (req, res) => {
    console.log("req.file", req.file);
    employeeController.updateProfilePicture(req, res);
   }
);

// get profile picture
app.post("/account/profilePicture", async (req, res) =>
  employeeController.getProfilePicture(req, res)
);

// RECORD
// create record
app.post("/record", async (req, res) => employeeController.createRecord(req, res));

// get last record
app.get("/record/last/:employeeId", async (req, res) =>
  employeeController.getLastRecord(req, res)
);

// DEPARTMENTS
app.get("/departments", (req, res) => {
  departmentController.getAll(req, res);});

app.get("/departments/:id", (req, res) => {
  departmentController.getById(req, res);
});

// EMPLOYEES
app.get("/employees", (req, res) => {
  employeeController.getAll(req, res);
});

app.get("/employees/:id", (req, res) => {
employeeController.getById(req, res); });
  
app.get("/employees/department/:department", (req, res) => {
 employeeController.getByDepartment(req, res); });

app.post("/addEmployee", (req, res) => employeeController.create(req, res));

app.delete("/employees/delete/:employeeId", (req, res) => {
  employeeController.remove(req, res);
});

// EVENTS
app.get("/events/:employeeId", (req, res) =>
  eventController.getEventsByEmployeeId(req, res)
);

app.post("/addEvent", (req, res) => eventController.create(req, res));

app.delete("/events/delete/:eventId", (req, res) => eventController.remove(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
