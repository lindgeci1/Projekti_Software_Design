const AbstractFactory = require('./AbstractFactory');
const ReportService = require('../services/ReportService');
const ReportRepository = require('../../adapters/repositories/ReportRepository');
const ReportController = require('../../adapters/controllers/ReportController');
const Logger = require('./Logger');  // Import the logger

class ReportFactory extends AbstractFactory {
    createRepository() {
        try {
            return new ReportRepository();
        } catch (error) {
            Logger.logError(this, `Error creating repository - ${error.message}`);
            throw error;
        }
    }

    createService() {
        try {
            const repository = this.createRepository();
            return new ReportService(repository);
        } catch (error) {
            Logger.logError(this, `Error creating service - ${error.message}`);
            throw error;
        }
    }

    createController() {
        try {
            const service = this.createService();
            return new ReportController(service);
        } catch (error) {
            Logger.logError(this, `Error creating controller - ${error.message}`);
            throw error;
        }
    }
}

module.exports = ReportFactory;
