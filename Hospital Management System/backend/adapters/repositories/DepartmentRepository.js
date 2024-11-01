const Department = require("../../core/entities/Department");
const Staff = require("../../models/Staff"); // Import Staff model
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

class DepartmentRepository {
    constructor() {
        this.Department = Department;
        this.Staff = Staff; // Initialize Staff model
        this.sequelize = sequelize;
    }

    async findAll() {
        const departments = await this.Department.findAll();
        return departments;
    }

    async findById(departmentId) {
        console.log(`Repository: Fetching department with ID ${departmentId}`);
        const department = await this.Department.findByPk(departmentId);
        if (!department) throw new Error("Department not found");
        return department;
    }

    async create(departmentData) {
        console.log("Repository: Creating a new department with data:", departmentData);
        return await this.Department.create(departmentData);
    }

    async update(departmentId, departmentData) {
        console.log(`Repository: Updating department with ID ${departmentId}`);
        const [updated] = await this.Department.update(departmentData, { where: { Dept_ID: departmentId } });
        if (!updated) throw new Error("Department not found or no changes made");
        return updated;
    }

    async delete(departmentId) {
        console.log(`Repository: Deleting department with ID ${departmentId}`);
        const transaction = await this.sequelize.transaction();

        try {
            const department = await this.Department.findByPk(departmentId, { transaction });
            if (!department) throw new Error("Department not found");

            // Delete related records within the transaction
            await this.Staff.destroy({ where: { Dept_ID: departmentId }, transaction });
            await this.Department.destroy({ where: { Dept_ID: departmentId }, transaction });

            await transaction.commit();
            console.log(`Repository: Department with ID ${departmentId} deleted successfully`);
            return { success: true, message: `Department with ID ${departmentId} deleted successfully` };
        } catch (error) {
            await transaction.rollback();
            console.error(`Repository: Failed to delete department with ID ${departmentId}`, error);
            throw error;
        }
    }
}

module.exports = new DepartmentRepository();
