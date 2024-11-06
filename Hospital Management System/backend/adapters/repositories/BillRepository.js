const Bill = require("../../core/entities/Bill");
const Medicine = require("../../core/entities/Medicine");
const Room = require("../../core/entities/Room");
const Visit = require("../../models/Visits");
const PdfReport = require("../../models/PdfReport");
const Patient = require("../../core/entities/Patient");
const Staff = require("../../models/Staff");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");
const Doctor = require('../../models/Doctor');

class BillRepository {
    constructor() {
        this.Bill = Bill;
        this.Medicine = Medicine;
        this.Room = Room;
        this.Visit = Visit;
        this.PdfReport = PdfReport;
        this.Patient = Patient;
        this.Staff = Staff;
        this.Doctor = Doctor;
        this.sequelize = sequelize;
    }

    async findAll() {
        console.log("Repository: Fetching all bills");
        const bills = await this.Bill.findAll({
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
        console.log("Repository: All bills fetched:", bills);
        return bills;
    }

    async findByPatientEmail(email) {
        const patient = await this.Patient.findOne({ where: { Email: email } });
        if (!patient) throw new Error("Patient not found");
        return await this.Bill.findAll({
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

        return await this.Bill.findAll({
            where: { Patient_ID: patientIds },
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
    }

    async findById(billId) {
        return await this.Bill.findByPk(billId, { include: [this.Patient] });
    }

    async findByPatientId(patientId) {
        return await this.Bill.findOne({ where: { Patient_ID: patientId } });
    }

    async findOtherBillByPatientId(billId, patientId) {
        return await this.Bill.findOne({
            where: { Patient_ID: patientId, Bill_ID: { [Op.ne]: billId } },
        });
    }

    async create(billData) {
        return await this.Bill.create(billData);
    }

    async update(billId, billData) {
        return await this.Bill.update(billData, { where: { Bill_ID: billId } });
    }

    async delete(billId) {
        const transaction = await this.sequelize.transaction();

        try {
            const bill = await this.Bill.findByPk(billId);
            if (!bill) return false;

            const patientId = bill.Patient_ID;

            await this.Bill.destroy({ where: { Bill_ID: billId }, transaction });
            await this.Visit.destroy({ where: { Patient_ID: patientId }, transaction });
            await this.Room.destroy({ where: { Patient_ID: patientId }, transaction });
            await this.Medicine.destroy({ where: { Patient_ID: patientId }, transaction });
            await this.PdfReport.destroy({ where: { Patient_ID: patientId }, transaction });

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new BillRepository();
