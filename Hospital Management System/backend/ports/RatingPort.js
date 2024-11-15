const RatingService = require("../core/services/RatingServices");

class RatingPort {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async findAllRatings(user) {
        console.log("Calling RatingService.findAllRatings with user:", user);
        return await this.ratingService.findAllRatings(user);
    }

    async findSingleRating(ratingId) {
        return await this.ratingService.findSingleRating(ratingId);
    }

    async addRating(ratingData) {
        return await this.ratingService.addRating(ratingData);
    }

    async updateRating(ratingId, ratingData) {
        return await this.ratingService.updateRating(ratingId, ratingData);
    }

    async deleteRating(ratingId) {
        return await this.ratingService.deleteRating(ratingId);
    }
}

module.exports = new RatingPort(RatingService);

