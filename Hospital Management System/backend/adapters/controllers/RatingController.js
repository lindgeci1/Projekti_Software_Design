const RatingPort = require("../../ports/RatingPort");

class RatingController {
    async findAllRatings(req, res) {
        console.log("Fetching ratings for user:", req.user);
        try {
            const ratings = await RatingPort.findAllRatings(req.user);
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSingleRating(req, res) {
        try {
            const rating = await RatingPort.findSingleRating(req.params.id);
            if (!rating) {
                return res.status(404).json({ message: "Rating not found" });
            }
            res.status(200).json(rating);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addRating(req, res) {
        try {
            const newRating = await RatingPort.addRating(req.body);
            res.status(201).json(newRating);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRating(req, res) {
        try {
            const updatedRating = await RatingPort.updateRating(req.params.id, req.body);
            if (!updatedRating) {
                return res.status(404).json({ message: "Rating not found or could not be updated" });
            }
            res.status(200).json(updatedRating);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRating(req, res) {
        try {
            const deletedRating = await RatingPort.deleteRating(req.params.id);
            if (!deletedRating) {
                return res.status(404).json({ message: "Rating not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RatingController();
