const RatingRepository = require("../../adapters/repositories/RatingRepository");
const RatingService = require("../services/RatingServices");
const RatingController = require("../../adapters/controllers/RatingController");
const BaseFactory = require("./BaseFactory");

class RatingFactory extends BaseFactory {
    static createRepository() {
        return new RatingRepository();  // Ensure this is creating a new instance
    }

    static createService() {
        return new RatingService(RatingFactory.createRepository());  // Passing instance of repository
    }

    static createController() {
        return new RatingController(RatingFactory.createService());  // Passing service to controller
    }
}

module.exports = RatingFactory;
