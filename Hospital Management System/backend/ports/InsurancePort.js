// InsurancePort.js
const InsuranceService = require("../core/services/InsuranceService");

class InsurancePort {
    constructor(insuranceService) {
        this.insuranceService = insuranceService;
    }
    async findAllInsurances(user) {
        console.log("Calling InsuranceService.findAllInsurances with user:", user);
        return await this.insuranceService.findAllInsurances(user);
    }

    async findSingleInsurance(insuranceId) {
        return await this.insuranceService.findSingleInsurance(insuranceId);
    }

    async addInsurance(insuranceData) {
        return await this.insuranceService.addInsurance(insuranceData);
    }

    async updateInsurance(insuranceId, insuranceData) {
        return await this.insuranceService.updateInsurance(insuranceId, insuranceData);
    }

    async deleteInsurance(insuranceId) {
        return await this.insuranceService.deleteInsurance(insuranceId);
    }
}

module.exports = new InsurancePort(InsuranceService);
