// BillPort.js
const BillService = require("../core/services/BillService");

class BillPort {
    async findAllBills(user) {
        console.log("Calling BillService.findAllBills with user:", user);
        return await BillService.findAllBills(user);
    }

    async findSingleBill(billId) {
        return await BillService.findSingleBill(billId);
    }

    async addBill(billData) {
        return await BillService.addBill(billData);
    }

    async updateBill(billId, billData) {
        return await BillService.updateBill(billId, billData);
    }

    async deleteBill(billId) {
        return await BillService.deleteBill(billId);
    }
}

module.exports = new BillPort();
