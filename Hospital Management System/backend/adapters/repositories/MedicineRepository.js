// MedicineRepository.js
const Medicine = require('../../core/entities/Medicine');
const { Op } = require('sequelize');
const Patient = require('../../core/entities/Patient');
const Staff = require('../../core/entities/Staff');
const Visit = require('../../core/entities/Visits');
const Doctor = require('../../core/entities/Doctor');
const sequelize = require('../../config/database');

class MedicineRepository {
    constructor() {
        this.Medicine = Medicine;
        this.Patient = Patient;
        this.Staff = Staff;
        this.Visit = Visit;
        this.Doctor = Doctor;
        this.sequelize = sequelize;
    }

    async findAll() {
        console.log("Repository: Fetching all medicines");
        const medicines = await this.Medicine.findAll({
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
        console.log("Repository: All medicines fetched:", medicines);
        return medicines;
    }

    async findById(medicineId) {
        return await this.Medicine.findByPk(medicineId);
    }

    async create(medicineData) {
        const { M_name, M_Quantity, M_Cost, Patient_ID } = medicineData;

        if (!M_name || M_Quantity === undefined || M_Cost === undefined || !Patient_ID) {
            throw new Error('All fields (M_name, M_Quantity, M_Cost, Patient_ID) are required');
        }
        const existingRoom = await this.Medicine.findOne({ where: { Patient_ID } });
        if (existingRoom) {
            throw new Error('This patient already has a medicine assigned');
        }


        return await this.Medicine.create(medicineData);
    }

    async update(medicineId, medicineData) {
        const { M_name, M_Quantity, M_Cost, Patient_ID } = medicineData;

        if (!M_name || M_Quantity === undefined || M_Cost === undefined || !Patient_ID) {
            throw new Error('All fields (M_name, M_Quantity, M_Cost, Patient_ID) are required');
        }
        const existingRoom = await this.Medicine.findOne({
            where: { Patient_ID, Medicine_ID: { [Op.ne]: medicineId } }
        });
        if (existingRoom) {
            throw new Error('This patient already has a medicine assigned. Update the existing medicine instead.');
        }

        const updated = await this.Medicine.update(medicineData, { where: { Medicine_ID: medicineId } });
        return updated[0] === 0 ? null : updated;
    }

    async delete(medicineId) {
        const deleted = await this.Medicine.destroy({ where: { Medicine_ID: medicineId } });
        return deleted === 0 ? null : deleted;
    }

    async findByPatientEmail(email) {
        const patient = await this.Patient.findOne({ where: { Email: email } });
        if (!patient) throw new Error("Patient not found");
        return await this.Medicine.findAll({
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

        return await this.Medicine.findAll({
            where: { Patient_ID: patientIds },
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
    }
}

module.exports = new MedicineRepository();
