const DepartmentPort = require("../../ports/DepartmentPort");

class DepartmentController {
    async findAllDepartments(req, res) {
        console.log("Fetching all departments");
        try {
            const departments = await DepartmentPort.findAllDepartments();
            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSingleDepartment(req, res) {
        try {
            const department = await DepartmentPort.findSingleDepartment(req.params.id);
            if (!department) {
                return res.status(404).json({ message: "Department not found" });
            }
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addDepartment(req, res) {
        try {
            const newDepartment = await DepartmentPort.addDepartment(req.body);
            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDepartment(req, res) {
        try {
            const updatedDepartment = await DepartmentPort.updateDepartment(req.params.id, req.body);
            if (!updatedDepartment) {
                return res.status(404).json({ message: "Department not found or could not be updated" });
            }
            res.status(200).json(updatedDepartment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const deletedDepartment = await DepartmentPort.deleteDepartment(req.params.id);
            if (!deletedDepartment) {
                return res.status(404).json({ message: "Department not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DepartmentController();
