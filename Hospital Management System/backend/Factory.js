const BillRepository = require("./adapters/repositories/BillRepository");
const BillService = require("./core/services/BillService");
const BillController = require("./adapters/controllers/BillController");

const ReportRepository = require("./adapters/repositories/ReportRepository");
const ReportService = require("./core/services/ReportService");
const ReportController = require("./adapters/controllers/ReportController");

class Factory {
    static createInstance(Constructor, name) {
        try {
            return new Constructor();
        } catch (error) {
            console.error(`Error creating ${name}:`, error.message);
            throw new Error(`Failed to create ${name}.`);
        }
    }
    //Bill Part
    static createBillRepository() {
        return Factory.createInstance(BillRepository, "BillRepository");
    }

    static createBillService() {
        return new BillService(Factory.createBillRepository());
    }

    static createBillController() {
        return new BillController(Factory.createBillService());
    }
    //Report Part
    static createReportRepository() {
        return Factory.createInstance(ReportRepository, "ReportRepository");
    }

    static createReportService() {
        return new ReportService(Factory.createReportRepository());
    }

    static createReportController() {
        return new ReportController(Factory.createReportService());
    }

    static createComponent(type) {
        if (type === 'bill') {
            return Factory.createBillController();
        } else if (type === 'report') {
            return Factory.createReportController();
        } else {
            throw new Error(`Invalid component type: ${type}. Must be 'bill' or 'report'.`);
        }
    }
}

module.exports = Factory;

