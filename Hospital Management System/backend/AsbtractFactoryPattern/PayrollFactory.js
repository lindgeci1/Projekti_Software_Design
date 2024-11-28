const AbstractFactory = require('./AbstractFactory');
const PayrollService = require('../core/services/PayrollService');
const PayrollRepository = require('../adapters/repositories/PayrollRepository');
const PayrollController = require('../adapters/controllers/PayrollController');

class PayrollFactory extends AbstractFactory {
    createRepository() {
        try {
            return new PayrollRepository(); // Instantiate the repository first
        } catch (error) {
            console.error(`${this.constructor.name}: Error creating repository - ${error.message}`);
            throw error;
        }
    }

    createService() {
        try {
            const repository = this.createRepository(); // Create repository and pass it to service
            return new PayrollService(repository);
        } catch (error) {
            console.error(`${this.constructor.name}: Error creating service - ${error.message}`);
            throw error;
        }
    }

    createController() {
        try {
            const service = this.createService(); // Create service and pass it to controller
            return new PayrollController(service);
        } catch (error) {
            console.error(`${this.constructor.name}: Error creating controller - ${error.message}`);
            throw error;
        }
    }
}

module.exports = PayrollFactory;
