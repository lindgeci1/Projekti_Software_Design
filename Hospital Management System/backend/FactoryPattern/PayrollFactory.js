const PayrollRepository = require("../adapters/repositories/PayrollRepository");
const PayrollService = require("../core/services/PayrollService");
const PayrollController = require("../adapters/controllers/PayrollController");
const BaseFactory = require("./BaseFactory");

class PayrollFactory extends BaseFactory {
    static createRepository() {
        return new PayrollRepository();
    }

    static createService() {
        return new PayrollService(PayrollFactory.createRepository());
    }

    static createController() {
        return new PayrollController(PayrollFactory.createService());
    }
}

module.exports = PayrollFactory;
