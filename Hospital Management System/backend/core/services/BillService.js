// BillService.js
const BillRepository = require("../../adapters/repositories/BillRepository");

class BillService {
    constructor(billRepository) {
        this.billRepository = billRepository;
    }

    async findAllBills(user) {
        console.log("Service: Finding all bills for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.billRepository.findAll();
        } else if (role === "patient") {
            return await this.billRepository.findByPatientEmail(email);
        } else if (role === "doctor") {
            return await this.billRepository.findByDoctorEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleBill(billId) {
        return await this.billRepository.findById(billId);
    }

    async addBill(billData) {
        const { Date_Issued, Amount, Patient_ID, Payment_Status, Description} = billData;
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const issuedDate = new Date(Date_Issued).setHours(0, 0, 0, 0);

        if (!Date_Issued || !Amount || !Patient_ID ||!Payment_Status ||!Description|| issuedDate < currentDate) {
            throw new Error("Invalid or missing data");
        }

        const existingBill = await this.billRepository.findByPatientId(Patient_ID);
        if (existingBill) {
            throw new Error("A bill already exists for this patient");
        }

        return await this.billRepository.create(billData);
    }

    async updateBill(billId, billData) {
        const { Date_Issued, Amount, Patient_ID, Payment_Status, Description} = billData;
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const issuedDate = new Date(Date_Issued).setHours(0, 0, 0, 0);

        if (!Date_Issued || !Amount || !Patient_ID ||!Payment_Status ||!Description || issuedDate < currentDate) {
            throw new Error("Invalid or missing data");
        }

        const existingBill = await this.billRepository.findOtherBillByPatientId(billId, Patient_ID);
        if (existingBill) {
            throw new Error("This patient already has another bill");
        }

        return await this.billRepository.update(billId, billData);
    }
}

module.exports = new BillService(BillRepository);
