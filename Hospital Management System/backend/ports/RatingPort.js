const RatingService = require("../core/services/RatingServices");

class RatingPort {
    async findAllRatings(user) {
        console.log("Calling RatingService.findAllRatings with user:", user);
        return await RatingService.findAllRatings(user);
    }

    async findSingleRating(ratingId) {
        return await RatingService.findSingleRating(ratingId);
    }

    async addRating(ratingData) {
        return await RatingService.addRating(ratingData);
    }

    async updateRating(ratingId, ratingData) {
        return await RatingService.updateRating(ratingId, ratingData);
    }

    async deleteRating(ratingId) {
        return await RatingService.deleteRating(ratingId);
    }
}

module.exports = new RatingPort();
