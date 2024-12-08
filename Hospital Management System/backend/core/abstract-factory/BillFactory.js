const AbstractFactory = require('./AbstractFactory');
const BillService = require('../services/BillService');
const BillRepository = require('../../adapters/repositories/BillRepository');
const BillController = require('../../adapters/controllers/BillController');
const Logger = require('./Logger');

class BillFactory extends AbstractFactory {
    createRepository() {
        try {
            return new BillRepository();
        } catch (error) {
            Logger.logError(this, `Error creating repository - ${error.message}`);
            throw error;
        }
    }

    createService() {
        try {
            const repository = this.createRepository();
            return new BillService(repository);
        } catch (error) {
            Logger.logError(this, `Error creating service - ${error.message}`);
            throw error;
        }
    }

    createController() {
        try {
            const service = this.createService();
            return new BillController(service);
        } catch (error) {
            Logger.logError(this, `Error creating controller - ${error.message}`);
            throw error;
        }
    }
}

module.exports = BillFactory;
