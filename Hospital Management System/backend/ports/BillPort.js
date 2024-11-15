// BillPort.js
const BillService = require("../core/services/BillService");

class BillPort {
    constructor(billService) {
        this.billService = billService;
    }
    async findAllBills(user) {
        console.log("Calling BillService.findAllBills with user:", user);
        return await this.billService.findAllBills(user);
    }

    async findSingleBill(billId) {
        return await this.billService.findSingleBill(billId);
    }

    async addBill(billData) {
        return await this.billService.addBill(billData);
    }

    async updateBill(billId, billData) {
        return await this.billService.updateBill(billId, billData);
    }

    async deleteBill(billId) {
        return await this.billService.deleteBill(billId);
    }
}

module.exports = new BillPort(BillService);
