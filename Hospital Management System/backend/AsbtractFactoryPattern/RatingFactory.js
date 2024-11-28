const AbstractFactory = require('./AbstractFactory');
const RatingService = require('../core/services/RatingServices');
const RatingRepository = require('../adapters/repositories/RatingRepository');
const RatingController = require('../adapters/controllers/RatingController');

class RatingFactory extends AbstractFactory {
    createRepository() {
        try {
            return new RatingRepository();
        } catch (error) {
            console.error(`${this.constructor.name}: Error creating repository - ${error.message}`);
            throw error;
        }
    }

    createService() {
        try {
            const repository = this.createRepository();
            return new RatingService(repository);
        } catch (error) {
            console.error(`${this.constructor.name}: Error creating service - ${error.message}`);
            throw error;
        }
    }

    createController() {
        try {
            const service = this.createService();
            return new RatingController(service);
        } catch (error) {
            console.error(`${this.constructor.name}: Error creating controller - ${error.message}`);
            throw error;
        }
    }
}

module.exports = RatingFactory;
