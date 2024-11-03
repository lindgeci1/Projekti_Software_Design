// InsurancePort.js
const InsuranceService = require("../core/services/InsuranceService");

class InsurancePort {
    async findAllInsurances(user) {
        console.log("Calling InsuranceService.findAllInsurances with user:", user);
        return await InsuranceService.findAllInsurances(user);
    }

    async findSingleInsurance(insuranceId) {
        return await InsuranceService.findSingleInsurance(insuranceId);
    }

    async addInsurance(insuranceData) {
        return await InsuranceService.addInsurance(insuranceData);
    }

    async updateInsurance(insuranceId, insuranceData) {
        return await InsuranceService.updateInsurance(insuranceId, insuranceData);
    }

    async deleteInsurance(insuranceId) {
        return await InsuranceService.deleteInsurance(insuranceId);
    }
}

module.exports = new InsurancePort();
