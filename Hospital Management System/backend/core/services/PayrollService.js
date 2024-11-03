const PayrollRepository = require("../../adapters/repositories/PayrollRepository");

class PayrollService {
    constructor(payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    async findAllPayrolls(user) {
        console.log("Service: Finding all payroll records for user:", user);
        const { email, role } = user;
        
        if (role === "admin") {
            return await this.payrollRepository.findAll();
        } else if (role === "doctor") {
            return await this.payrollRepository.findByStaffEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSinglePayroll(payrollId) {
        return await this.payrollRepository.findById(payrollId);
    }

    async addPayroll(payrollData) {
        const { Salary, Emp_ID } = payrollData;

        if ( !Salary || !Emp_ID ) {
            throw new Error("Invalid or missing data");
        }

        const existingPayroll = await this.payrollRepository.findByStaffId(Emp_ID);
        if (existingPayroll) {
            throw new Error("A payroll record already exists for this employee");
        }

        return await this.payrollRepository.create(payrollData);
    }

    async updatePayroll(payrollId, payrollData) {
        const { Salary, Emp_ID } = payrollData;
    
        if (!Salary || !Emp_ID) {
            throw new Error("Invalid or missing data");
        }
    
        // Fetch the existing payroll record for the given payroll ID
        const existingPayroll = await this.payrollRepository.findById(payrollId);
        if (!existingPayroll) {
            throw new Error("Payroll record not found");
        }
    
        // Check if the Emp_ID is different from the existing record
        if (existingPayroll.Emp_ID !== Emp_ID) {
            // Check for existing payroll records for the new employee
            const employeePayroll = await this.payrollRepository.findByStaffId(Emp_ID);
            
            // Allow the update if the payroll record belongs to the same employee
            if (employeePayroll) {
                throw new Error("This employee already has another payroll record");
            }
        }
    
        // Proceed to update the payroll record
        const updatedPayroll = await this.payrollRepository.update(payrollId, payrollData);
    
        // Return a success message along with the updated data
        return {
            message: "Payroll updated successfully",
            data: updatedPayroll,
        };
    }
    

    async deletePayroll(payrollId) {
        return await this.payrollRepository.delete(payrollId);
    }
}

module.exports = new PayrollService(PayrollRepository);
