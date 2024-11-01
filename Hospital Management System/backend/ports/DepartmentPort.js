// DepartmentPort.js
const DepartmentService = require("../core/services/DepartmentServices");

class DepartmentPort {
    async findAllDepartments() {
        console.log("Calling DepartmentService.findAllDepartments");
        return await DepartmentService.findAllDepartments();
    }

    async findSingleDepartment(departmentId) {
        console.log(`Calling DepartmentService.findSingleDepartment with ID: ${departmentId}`);
        return await DepartmentService.findSingleDepartment(departmentId);
    }

    async addDepartment(departmentData) {
        console.log("Calling DepartmentService.addDepartment with data:", departmentData);
        return await DepartmentService.addDepartment(departmentData);
    }

    async updateDepartment(departmentId, departmentData) {
        console.log(`Calling DepartmentService.updateDepartment with ID: ${departmentId} and data:`, departmentData);
        return await DepartmentService.updateDepartment(departmentId, departmentData);
    }

    async deleteDepartment(departmentId) {
        console.log(`Calling DepartmentService.deleteDepartment with ID: ${departmentId}`);
        return await DepartmentService.deleteDepartment(departmentId);
    }
}

module.exports = new DepartmentPort();
