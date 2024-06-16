import { Router } from "express";
import { EmployeeController } from "../controllers/employees.js";
import { EmployeeModel } from "../models/employee.js";


//Actualmente no se está utilizando, no funcionaba

export const createEmployeeRouter = () => {
  const employeeRouter = Router();

  const employeeController = new EmployeeController({
    employeeModel: EmployeeModel,
  });

  employeeRouter.get("/employees", (req, res) => {
    res.json("employeeController.getAll(req, res)");
    // res.send(employeeController.getAll(req, res))
  });
  employeeRouter.get("/:id", (req, res) =>
    employeeController.getById(req, res)
  );

  employeeRouter.post("/addEmployee", (req, res) =>
    employeeController.create(req, res)
  );
  employeeRouter.patch("/:id", (req, res) =>
    employeeController.update(req, res)
  );
  employeeRouter.delete("/:id", (req, res) =>
    employeeController.remove(req, res)
  );

  return employeeRouter;
};
