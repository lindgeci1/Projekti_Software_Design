const Visit = require('../../core/entities/Visits');
const Patient = require('../../core/entities/Patient');
const Doctor = require('../../core/entities/Doctor');
const Staff = require('../../core/entities/Staff');
const { Op } = require('sequelize');
const Room = require('../../core/entities/Room');
const Medicine = require('../../core/entities/Medicine');
const PdfReport = require('../../core/entities/PdfReport');
const Bill = require('../../core/entities/Bill');
const sequelize = require('../../config/database');
const VisitPort = require('../../ports/VisitPort');
class VisitRepository extends VisitPort{
    constructor() {
        super();
        this.Visit = Visit;
        this.Patient = Patient;
        this.Doctor = Doctor;
        this.Staff = Staff;
        this.Room = Room;
        this.Medicine = Medicine;
        this.PdfReport = PdfReport;
        this.Bill = Bill;
        this.sequelize = sequelize;
    }

    // Fetch all visits for different roles
    async findAll(user) {
        console.log("Repository: Fetching all visits for user:", user);
        const { email, role } = user;
    
        let condition = {}; // Default condition for all visits
        
        if (role === 'patient') {
            const patient = await this.findByPatientEmail(email);
            condition = { Patient_ID: patient.Patient_ID }; // Filter visits for this patient
        } else if (role === 'doctor') {
            const doctor = await this.findByDoctorEmail(email);
            condition = { Doctor_ID: doctor.Doctor_ID }; // Filter visits for this doctor
        }
    
        const visits = await this.Visit.findAll({
            where: condition,
            include: [
                { model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] },
                { model: this.Doctor, include: [{ model: this.Staff, attributes: ['Emp_Fname', 'Emp_Lname', 'Email'] }] }
            ]
        });
    
        console.log("Repository: Visits fetched:", visits);
        return visits;
    }
    

    // Get a single visit by ID
    async findById(visitId) {
        return await this.Visit.findByPk(visitId, {
            include: [
                { model: Patient, attributes: ['Patient_Fname', 'Patient_Lname'] },
                { model: Doctor, attributes: ['Doctor_ID'], include: [{ model: Staff, attributes: ['Emp_Fname', 'Emp_Lname'] }] }
            ]
        });
    }

    // Fetch all visits by patient ID
    async findByPatientId(patientId) {
        return await this.Visit.findAll({
            where: { Patient_ID: patientId },
            include: [
                { model: Patient, attributes: ['Patient_Fname', 'Patient_Lname'] },
                { model: Doctor, include: [{ model: Staff, attributes: ['Emp_Fname', 'Emp_Lname'] }] }
            ]
        });
    }

    // Create a new visit
    async createVisit(visitData) {
        const { Patient_ID, Doctor_ID, date_of_visit, condition, Time, therapy } = visitData;

        // Optional: Validate patient and doctor existence
        const patient = await this.Patient.findByPk(Patient_ID);
        const doctor = await this.Doctor.findByPk(Doctor_ID);
        
        if (!patient) throw new Error("Patient not found");
        if (!doctor) throw new Error("Doctor not found");

        // Validation: Ensure date of visit is not in the past
        const visitDate = new Date(date_of_visit);
        if (visitDate < new Date().setHours(0, 0, 0, 0)) {
            throw new Error("Cannot schedule a visit in the past");
        }

        // Check for existing visit for this patient
        const existingVisit = await this.Visit.findOne({ where: { Patient_ID } });
        if (existingVisit) {
            throw new Error("This patient already has a visit record.");
        }

        // Check if doctor is already booked at this time
        const existingAppointment = await this.Visit.findOne({
            where: { Doctor_ID, date_of_visit: visitDate, Time }
        });
        if (existingAppointment) {
            throw new Error("Doctor is busy at this time, please choose another date or time.");
        }

        return await this.Visit.create({ Patient_ID, Doctor_ID, date_of_visit: visitDate, condition, Time, therapy });
    }

    async updateVisit(visitId, visitData) {
        const { Patient_ID, Doctor_ID, date_of_visit, condition, Time, therapy } = visitData;
    
        const visitRecord = await this.Visit.findByPk(visitId);
        if (!visitRecord) throw new Error("Visit not found");
    
        // Check if the new date is valid
        const visitDate = new Date(date_of_visit);
        if (visitDate < new Date().setHours(0, 0, 0, 0)) {
            throw new Error("Cannot update to a date in the past");
        }
    
        // Check if there's another visit record for the patient with a different visit ID
        if (visitRecord.Patient_ID !== Patient_ID) { // Only check if Patient_ID is being changed
            const existingVisit = await this.Visit.findOne({
                where: {
                    Patient_ID,
                    Visit_ID: { [Op.ne]: visitId } // Exclude the current visit being updated
                }
            });
            if (existingVisit) {
                throw new Error("This patient already has a visit record.");
            }
        }
    
        // Check for conflicts if Doctor_ID, date_of_visit, or Time are being changed
        if (
            visitRecord.Doctor_ID !== Doctor_ID ||
            visitRecord.date_of_visit !== date_of_visit ||
            visitRecord.Time !== Time
        ) {
            const conflict = await this.Visit.findOne({
                where: {
                    Doctor_ID,
                    date_of_visit: visitDate,
                    Time,
                    Visit_ID: { [Op.ne]: visitId } // Exclude the current visit being updated
                }
            });
            if (conflict) {
                throw new Error("Doctor is busy at this time, please choose another date or time.");
            }
        }
    
        // Update the visit if all checks pass
        const [updatedRows] = await this.Visit.update(
            { Patient_ID, Doctor_ID, date_of_visit: visitDate, condition, Time, therapy },
            { where: { Visit_ID: visitId } }
        );
        
        // If no rows were updated, respond accordingly
        if (updatedRows === 0) {
            throw new Error("Visit not found or no changes were made");
        }
    
        return { success: true, message: "Visit updated successfully" };
    }
    

    // Delete a visit and associated records
    async delete(visitId) {
        const transaction = await this.sequelize.transaction();

        try {
            const visit = await this.Visit.findByPk(visitId);
            if (!visit) return false;

            const patientId = visit.Patient_ID;

            // Delete associated room, medicines, report, and bill for the patient
            await this.Room.destroy({ where: { Patient_ID: patientId }, transaction });
            await this.Medicine.destroy({ where: { Patient_ID: patientId }, transaction });
            await this.PdfReport.destroy({ where: { Patient_ID: patientId }, transaction });
            await this.Bill.destroy({ where: { Patient_ID: patientId }, transaction });

            // Delete the visit
            await this.Visit.destroy({ where: { Visit_ID: visitId }, transaction });

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // Helper method to get patient by email
    async findByPatientEmail(email) {
        try {
            const patient = await this.Patient.findOne({
                where: { Email: email }
            });

            if (!patient) {
                throw new Error('Patient not found');
            }

            return patient;
        } catch (error) {
            console.error('Error fetching patient by email:', error);
            throw error;
        }
    }

    // Helper method to get doctor by email
    async findByDoctorEmail(email) {
        try {
            const staff = await this.Staff.findOne({
                where: { Email: email }
            });

            if (!staff) {
                throw new Error('Staff member not found');
            }

            const doctor = await this.Doctor.findOne({
                where: { Emp_ID: staff.Emp_ID }
            });

            if (!doctor) {
                throw new Error('Doctor not found');
            }

            return doctor;
        } catch (error) {
            console.error('Error fetching doctor by email:', error);
            throw error;
        }
    }

    async findVisitsByPatientId(patientId) {
        try {
            const visits = await this.Visit.findAll({
                where: { Patient_ID: patientId },
                include: [
                    { 
                        model: this.Patient, 
                        attributes: ['Patient_Fname', 'Patient_Lname', 'Personal_Number', 'Birth_Date', 'Blood_type', 'Email', 'Gender', 'Phone'] 
                    },
                    { 
                        model: this.Doctor, 
                        attributes: ['Doctor_ID'], 
                        include: [{ model: this.Staff, attributes: ['Emp_Fname', 'Emp_Lname', 'Email'] }] 
                    }
                ]
            });

            return visits;
        } catch (error) {
            throw new Error("Error fetching visits by patient ID: " + error.message);
        }
    }
}

module.exports = new VisitRepository();
