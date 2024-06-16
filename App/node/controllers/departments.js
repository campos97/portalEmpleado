// controllers/departments.js
export class DepartmentController {
  constructor({ departmentModel }) {
    this.departmentModel = departmentModel;
  }

  async getAll(req, res) {
    try {
      const departments = await this.departmentModel.getAll();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const department = await this.departmentModel.getById(req.params.id);
      res.json(department);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
