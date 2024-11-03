const PayrollService = require("../core/services/PayrollService");

class PayrollPort {
    async findAllPayrolls(user) {
        console.log("Calling PayrollService.findAllPayrolls with user:", user);
        return await PayrollService.findAllPayrolls(user);
    }

    async findSinglePayroll(payrollId) {
        return await PayrollService.findSinglePayroll(payrollId);
    }

    async addPayroll(payrollData) {
        return await PayrollService.addPayroll(payrollData);
    }

    async updatePayroll(payrollId, payrollData) {
        return await PayrollService.updatePayroll(payrollId, payrollData);
    }

    async deletePayroll(payrollId) {
        return await PayrollService.deletePayroll(payrollId);
    }
}

module.exports = new PayrollPort();
