const PayrollService = require("../core/services/PayrollService");

class PayrollPort {
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async findAllPayrolls(user) {
        console.log("Calling PayrollService.findAllPayrolls with user:", user);
        return await this.payrollService.findAllPayrolls(user);
    }

    async findSinglePayroll(payrollId) {
        return await this.payrollService.findSinglePayroll(payrollId);
    }

    async addPayroll(payrollData) {
        return await this.payrollService.addPayroll(payrollData);
    }

    async updatePayroll(payrollId, payrollData) {
        return await this.payrollService.updatePayroll(payrollId, payrollData);
    }

    async deletePayroll(payrollId) {
        return await this.payrollService.deletePayroll(payrollId);
    }
}

module.exports = new PayrollPort(PayrollService);
