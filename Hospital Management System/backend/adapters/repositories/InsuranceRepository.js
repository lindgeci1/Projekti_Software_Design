// InsuranceRepository.js
const Insurance = require("../../core/entities/Insurance");
const Patient = require("../../core/entities/Patient");
const Staff = require("../../models/Staff");
const Visit = require("../../models/Visits");
const PdfReport = require("../../models/PdfReport"); // If relevant for insurance
const sequelize = require("../../config/database");
const { Op } = require("sequelize");
const Doctor = require('../../models/Doctor');

class InsuranceRepository {
    constructor() {
        this.Insurance = Insurance;
        this.Patient = Patient;
        this.Staff = Staff;
        this.Visit = Visit;
        this.PdfReport = PdfReport; // If you need to handle PDF reports for insurance
        this.sequelize = sequelize;
        this.Doctor = Doctor;
    }

    async findAll() {
        console.log("Repository: Fetching all insurances");
        const insurances = await this.Insurance.findAll({
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
        console.log("Repository: All insurances fetched:", insurances);
        return insurances;
    }

    async findByPatientEmail(email) {
        const patient = await this.Patient.findOne({ where: { Email: email } });
        if (!patient) throw new Error("Patient not found");
        return await this.Insurance.findAll({
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

        return await this.Insurance.findAll({
            where: { Patient_ID: patientIds },
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
    }

    async findById(insuranceId) {
        return await this.Insurance.findByPk(insuranceId, { include: [this.Patient] });
    }

    async findByPatientId(patientId) {
        return await this.Insurance.findOne({ where: { Patient_ID: patientId } });
    }

// InsuranceRepository.js
async findOtherInsuranceByPolicyNumber(policyNumber) {
    return await this.Insurance.findOne({
        where: { Ins_Code: policyNumber }
    });
}


async create(insuranceData) {
    try {
        const newInsurance = await this.Insurance.create(insuranceData);
        console.log("Repository: New insurance record created:", newInsurance);
        return newInsurance; // Ensure this returns correctly
    } catch (error) {
        console.error("Error creating insurance record:", error);
        throw error;
    }
}


    
    async update(insuranceId, insuranceData) {
        try {
            // Change Ins_Code to Policy_Number in the WHERE clause
            const [updatedRows] = await this.Insurance.update(insuranceData, { where: { Policy_Number: insuranceId } });
            if (updatedRows === 0) throw new Error("Insurance record not found or not updated");
            console.log("Repository: Insurance record updated:", updatedRows);
            return updatedRows;
        } catch (error) {
            console.error("Error updating insurance record:", error);
            throw error;
        }
    }
    

    async delete(insuranceId) {
        const transaction = await this.sequelize.transaction();

        try {
            const insurance = await this.Insurance.findByPk(insuranceId);
            if (!insurance) return false;

            await this.Insurance.destroy({ where: { Policy_Number: insuranceId }, transaction });

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new InsuranceRepository();