const BillRepository = require("../adapters/repositories/BillRepository");
const BillService = require("../core/services/BillService");
const BillController = require("../adapters/controllers/BillController");

const ReportRepository = require("../adapters/repositories/ReportRepository");
const ReportService = require("../core/services/ReportService");
const ReportController = require("../adapters/controllers/ReportController");

class Factory {

    static createInstance(Constructor, name) {
        try {
            return new Constructor();
        } catch (error) {
            console.error(`Error creating ${name}:`, error.message);
            throw new Error(`Failed to create ${name}.`);
        }
    }
    static componentMap = {
        'bill': {
            repository: BillRepository,
            service: BillService,
            controller: BillController,
        },
        'report': {
            repository: ReportRepository,
            service: ReportService,
            controller: ReportController,
        }
    };





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
        const component = Factory.componentMap[type.toLowerCase()];

        if (!component) {
            throw new Error(`Invalid component type: ${type}. Must be one of ${Object.keys(Factory.componentMap).join(', ')}.`);
        }

        return new component.controller(new component.service(new component.repository()));
    }
}

module.exports = Factory;

