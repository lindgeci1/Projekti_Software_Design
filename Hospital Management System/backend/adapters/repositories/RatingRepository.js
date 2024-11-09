const Rating = require("../../core/entities/Rating");
const Staff = require("../../core/entities/Staff");
const Doctor = require("../../models/Doctor");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

class RatingRepository {
    constructor() {
        this.Rating = Rating;
        this.Staff = Staff;
        this.sequelize = sequelize;
    }

    async findAll() {
        console.log("Repository: Fetching all ratings");
        return await this.Rating.findAll({
            include: [{ model: this.Staff, attributes: ["Emp_Fname", "Emp_Lname"] }],
        });
    }

    async findAllForDoctor(email) {
        const staff = await this.Staff.findOne({ where: { Email: email } });
        if (!staff) throw new Error("Staff not found");

        return await this.Rating.findAll({
            where: { Emp_ID: staff.Emp_ID },
            include: [{ model: this.Staff, attributes: ["Emp_Fname", "Emp_Lname"] }],
        });
    }

    async findById(ratingId) {
        console.log("Repository: Fetching rating by ID:", ratingId);
        return await this.Rating.findByPk(ratingId, {
            include: [{ model: this.Staff, attributes: ["Emp_Fname", "Emp_Lname"] }],
        });
    }

    async findByStaffId(empId) {
        return await this.Rating.findOne({ where: { Emp_ID: empId } });
    }

    async create(ratingData) {
        console.log("Repository: Creating a new rating");
        return await this.Rating.create(ratingData);
    }

    async update(ratingId, ratingData) {
        console.log("Repository: Updating rating with ID:", ratingId);
        return await this.Rating.update(ratingData, { where: { Rating_ID: ratingId } });
    }

    async delete(ratingId) {
        console.log("Repository: Deleting rating with ID:", ratingId);
        return await this.Rating.destroy({ where: { Rating_ID: ratingId } });
    }
}

module.exports = new RatingRepository();
