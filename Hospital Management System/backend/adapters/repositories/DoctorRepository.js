const Doctor = require("../../core/entities/Doctor");
const Staff = require("../../core/entities/Staff"); // Import Staff model
const sequelize = require("../../config/database");
const DoctorPort = require("../../ports/DoctorPort");
class DoctorRepository extends DoctorPort{
  constructor() {
    super();
    this.Doctor = Doctor;
    this.Staff = Staff; 
    this.sequelize = sequelize;
  }
  async findAll() {
    try {
        const doctors = await this.Doctor.findAll({
            include: [
                {
                    model: Staff,
                    attributes: ['Emp_Fname', 'Emp_Lname'] // Include only the first name and last name attributes
                }
            ]
        });
        return doctors;
    } catch (error) {
        console.error('Error fetching all doctors:', error);
        throw error;
    }
}


  async findById(doctorId) {
    console.log(`Repository: Fetching doctor with ID ${doctorId}`);
    const doctor = await this.Doctor.findByPk(doctorId);
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  }

  async create(doctorData) {
    console.log("Repository: Creating a new doctor with data:", doctorData);
    return await this.Doctor.create(doctorData);
  }

  async update(doctorId, doctorData) {
    console.log(`Repository: Updating doctor with ID ${doctorId}`);
    const [updated] = await this.Doctor.update(doctorData, { where: { Doctor_ID: doctorId } });
    if (!updated) throw new Error("Doctor not found or no changes made");
    return updated;
  }

  async delete(doctorId) {
    console.log(`Repository: Deleting doctor with ID ${doctorId}`);
    const transaction = await this.sequelize.transaction();

    try {
      const doctor = await this.Doctor.findByPk(doctorId, { transaction });
      if (!doctor) throw new Error("Doctor not found");

      // Delete related records within the transaction (if applicable)
      await this.Staff.destroy({ where: { Emp_ID: doctor.Emp_ID }, transaction });
      await this.Doctor.destroy({ where: { Doctor_ID: doctorId }, transaction });

      await transaction.commit();
      console.log(`Repository: Doctor with ID ${doctorId} deleted successfully`);
      return { success: true, message: `Doctor with ID ${doctorId} deleted successfully` };
    } catch (error) {
      await transaction.rollback();
      console.error(`Repository: Failed to delete doctor with ID ${doctorId}`, error);
      throw error;
    }
  }

  async findBySpecialization(specialization) {
    console.log(`Repository: Checking if doctor with specialization ${specialization} exists`);
    return await this.Doctor.findOne({ where: { Specialization: specialization } });
  }
}

module.exports = new DoctorRepository();