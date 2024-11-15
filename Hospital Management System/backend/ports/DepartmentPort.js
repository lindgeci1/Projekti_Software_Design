const DepartmentService = require("../core/services/DepartmentServices");

class DepartmentPort {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async findAllDepartments() {
        console.log("Calling DepartmentService.findAllDepartments");
        return await this.departmentService.findAllDepartments();
    }

    async findSingleDepartment(departmentId) {
        console.log(`Calling DepartmentService.findSingleDepartment with ID: ${departmentId}`);
        return await this.departmentService.findSingleDepartment(departmentId);
    }

    async addDepartment(departmentData) {
        console.log("Calling DepartmentService.addDepartment with data:", departmentData);
        return await this.departmentService.addDepartment(departmentData);
    }

    async updateDepartment(departmentId, departmentData) {
        console.log(`Calling DepartmentService.updateDepartment with ID: ${departmentId} and data:`, departmentData);
        return await this.departmentService.updateDepartment(departmentId, departmentData);
    }

    async deleteDepartment(departmentId) {
        console.log(`Calling DepartmentService.deleteDepartment with ID: ${departmentId}`);
        return await this.departmentService.deleteDepartment(departmentId);
    }
}

module.exports = new DepartmentPort(DepartmentService);

