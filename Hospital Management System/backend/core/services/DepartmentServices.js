// DepartmentService.js
const DepartmentRepository = require("../../adapters/repositories/DepartmentRepository");

class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    async findAllDepartments() {
        console.log("Service: Finding all departments");
        return await this.departmentRepository.findAll();
    }

    async findSingleDepartment(departmentId) {
        console.log(`Service: Finding department with ID ${departmentId}`);
        return await this.departmentRepository.findById(departmentId);
    }

    async addDepartment(departmentData) {
        console.log("Service: Adding new department with data:", departmentData);
        const { Dept_head, Dept_name, Emp_Count } = departmentData;

        if (!Dept_head) {
            throw new Error("Department head is required");
        }
        if (!Dept_name) {
            throw new Error("Department name is required");
        }
        if (!Emp_Count) {
            throw new Error("Department count is required");
        }

        // Check if department with the same Dept_name already exists
        const existingDepartment = await this.departmentRepository.findByName(Dept_name);
        if (existingDepartment) {
            throw new Error("A department with this name already exists");
        }

        return await this.departmentRepository.create(departmentData);
    }

    async updateDepartment(departmentId, departmentData) {
        console.log(`Service: Updating department with ID ${departmentId}`);
        const { Dept_head, Dept_name, Emp_Count } = departmentData;
        
        if (!Dept_head) {
            throw new Error("Department head is required");
        }
        if (!Dept_name) {
            throw new Error("Department name is required");
        }
        if (!Emp_Count) {
            throw new Error("Department count is required");
        }
        
        // Check if the department exists before updating
        const existingDepartment = await this.departmentRepository.findById(departmentId); // This will throw if not found
        if (!existingDepartment) {
            throw new Error("Department not found");
        }
        
        // Only check for the department name if it's being changed
        if (existingDepartment.Dept_name !== Dept_name) {
            // Check if another department with the same Dept_name already exists
            const departmentWithSameName = await this.departmentRepository.findByName(Dept_name);
            if (departmentWithSameName) {
                throw new Error("A department with this name already exists");
            }
        }
        const updatedDepartment = await this.departmentRepository.update(departmentId, departmentData);
    
        // Log or return a success message
        console.log("Department updated successfully:", updatedDepartment);
        
        return {
            message: "Department updated successfully",
            department: updatedDepartment
        };
    }
    
    

    async deleteDepartment(departmentId) {
        console.log(`Service: Deleting department with ID ${departmentId}`);
        // Check if the department exists before deleting
        await this.departmentRepository.findById(departmentId); // This will throw if not found

        return await this.departmentRepository.delete(departmentId);
    }
}

module.exports = new DepartmentService(DepartmentRepository);
