const MedicalHistory = require('../../core/entities/MedicalHistory');
const Patient = require('../../core/entities/Patient');
const Staff = require('../../core/entities/Staff');
const Doctor = require('../../core/entities/Doctor');
const Visit = require('../../core/entities/Visits');
const { Op } = require('sequelize');

class MedicalHistoryRepository {
    constructor() {
        this.MedicalHistory = MedicalHistory;
        this.Patient = Patient;
        this.Staff = Staff;
        this.Doctor = Doctor;
        this.Visit = Visit;
    }


    async findAll() {
        console.log("Repository: Fetching all medical history");
        const medicalhistory = await this.MedicalHistory.findAll({
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
        console.log("Repository: All medical history fetched:", medicalhistory);
        return medicalhistory;
    }

    async findById(medicalHistoryId) {
        return await this.MedicalHistory.findByPk(medicalHistoryId);
    }

    async create(data) {
        const { Patient_ID, Allergies, Pre_Conditions } = data;
    
        // Check if required fields are provided
        if (!Patient_ID || !Allergies || !Pre_Conditions) {
            throw new Error('Patient ID, Allergies, and Pre-Conditions are required.');
        }
    
        // Check if the patient already has a medical history
        const existingHistory = await this.MedicalHistory.findOne({ where: { Patient_ID } });
        if (existingHistory) {
            throw new Error('This patient already has a medical history.');
        }
    
        // Create new medical history
        const newHistory = await this.MedicalHistory.create(data);
    
        // Return success message along with created data
        return {
            message: 'Medical history created successfully.',
            createdData: newHistory
        };
    }

    async update(id, data) {
        const { Patient_ID, Allergies, Pre_Conditions } = data;

        if (!Patient_ID || !Allergies || !Pre_Conditions) {
            throw new Error('Patient ID, Allergies, and Pre-Conditions are required.');
        }
        const existingHistory = await this.MedicalHistory.findOne({
            where: { Patient_ID, Record_ID: { [Op.ne]: id } }
        });
        if (existingHistory) {
            throw new Error('This patient already has a medical history.');
        }

        const updated = await this.MedicalHistory.update(data, { where: { Record_ID: id } });
        if (updated[0] === 0) {
            return null;
        } else {
            return {
                message: 'Medical history updated successfully.',
                updatedData: updated
            };
        }
    }

async delete(id) {
    try {
        const deleted = await this.MedicalHistory.destroy({ where: { Record_ID: id } });

        if (deleted === 0) {
            console.log("No records found to delete.");
            return { message: "No medical history found to delete.", deleted: false };
        }

        console.log("Record deleted successfully.");
        return { message: "Medical history deleted successfully.", deleted: true };

    } catch (error) {
        console.error("Error deleting medical history:", error);
        return { message: "Error occurred while deleting medical history.", error: error.message };
    }
}

    


    async findByPatientEmail(email) {
        const patient = await this.Patient.findOne({ where: { Email: email } });
        if (!patient) throw new Error("Patient not found");
        return await this.MedicalHistory.findAll({
            where: { Patient_ID: patient.Patient_ID },
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
    }

    async findByDoctorEmail(email) {
        const doctor = await this.Staff.findOne({ where: { Email: email } })
            .then((staff) => {
                return this.Doctor.findOne({ where: { Emp_ID: staff.Emp_ID } });
            });
        const visits = await this.Visit.findAll({ where: { Doctor_ID: doctor.Doctor_ID } });
        const patientIds = visits.map((visit) => visit.Patient_ID);

        return await this.MedicalHistory.findAll({
            where: { Patient_ID: patientIds },
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
    }
}

module.exports = new MedicalHistoryRepository();
