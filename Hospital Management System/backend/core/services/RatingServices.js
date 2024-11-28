class RatingService {
    constructor(ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    async findAllRatings(user) {
        console.log("Service: Finding all ratings for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.ratingRepository.findAll();
        } else if (role === "doctor") {
            return await this.ratingRepository.findAllForDoctor(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleRating(ratingId) {
        return await this.ratingRepository.findById(ratingId);
    }

    async addRating(ratingData) {
        const { Emp_ID, Rating, Comments, Date } = ratingData;

        if (!Emp_ID || !Rating || !Comments || !Date) {
            throw new Error("Invalid or missing data");
        }
        if (Emp_ID < 1) {
            throw new Error("Staff ID cannot be less than 1");
        }
        if (Comments.length > 30) {
            throw new Error("Comments must be maximum 30 characters long");
        }

        const existingRating = await this.ratingRepository.findByStaffId(Emp_ID);
        if (existingRating) {
            throw new Error("A rating already exists for this employee");
        }

        return await this.ratingRepository.create(ratingData);
    }

    async updateRating(ratingId, ratingData) {
        const { Emp_ID, Rating, Comments, Date } = ratingData;

        if (!Emp_ID || !Rating || !Comments || !Date) {
            throw new Error("Invalid or missing data");
        }
        if (Emp_ID < 1) {
            throw new Error("Staff ID cannot be less than 1");
        }
        if (Comments.length > 30) {
            throw new Error("Comments must be maximum 30 characters long");
        }

        const existingRating = await this.ratingRepository.findByStaffId(Emp_ID);
        if (existingRating && existingRating.Rating_ID !== parseInt(ratingId)) {
            throw new Error("This employee already has another rating");
        }

        return await this.ratingRepository.update(ratingId, ratingData);
    }

    async deleteRating(ratingId) {
        return await this.ratingRepository.delete(ratingId);
    }
}

module.exports = RatingService;
