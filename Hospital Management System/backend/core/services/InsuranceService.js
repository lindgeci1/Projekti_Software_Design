// InsuranceService.js
const InsuranceRepository = require("../../adapters/repositories/InsuranceRepository");

class InsuranceService {
    constructor(insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    async findAllInsurances(user) {
        console.log("Service: Finding all insurances for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.insuranceRepository.findAll();
        } else if (role === "patient") {
            return await this.insuranceRepository.findByPatientEmail(email);
        } else if (role === "doctor") {
            return await this.insuranceRepository.findByDoctorEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleInsurance(insuranceId) {
        return await this.insuranceRepository.findById(insuranceId);
    }

   // InsuranceService.js
async addInsurance(insuranceData) {
    const { Patient_ID, Ins_Code, End_Date, Provider, Dental } = insuranceData;

    // Validate required fields
    if (!Patient_ID || !Ins_Code || !End_Date || !Provider || !Dental) {
        throw new Error("Invalid or missing data");
    }

    // Check if the associated Patient exists
    const patientExists = await this.insuranceRepository.Patient.findByPk(Patient_ID);
    if (!patientExists) {
        throw new Error("Patient not found");
    }

    // Check for an existing insurance with the same Ins_Code
    const existingInsurance = await this.insuranceRepository.findOtherInsuranceByPolicyNumber(Ins_Code);
    if (existingInsurance) {
        throw new Error("An insurance policy with this Ins_Code already exists");
    }

    // Create the new insurance record
    const newInsurance = await this.insuranceRepository.create(insuranceData);
    return {
        message: "Insurance created successfully",
        data: newInsurance,
    };
}

    
async updateInsurance(insuranceId, insuranceData) {
    const { Patient_ID, Ins_Code, End_Date, Provider, Dental } = insuranceData;

    // Validate required fields
    if (!Patient_ID || !Ins_Code || !End_Date || !Provider || !Dental) {
        throw new Error("Invalid or missing data");
    }

    // Fetch the existing insurance record by primary key (insuranceId)
    const existingInsurance = await this.insuranceRepository.findById(insuranceId);
    if (!existingInsurance) {
        throw new Error("Insurance record not found");
    }

    // Only perform the `Ins_Code` uniqueness check if `Ins_Code` has changed
    if (existingInsurance.Ins_Code !== Ins_Code) {
        // Check if the new Ins_Code is already in use by another insurance record
        const existingPolicy = await this.insuranceRepository.findOtherInsuranceByPolicyNumber(Ins_Code);
        
        // If the Ins_Code already exists in another record, throw an error
        if (existingPolicy) {
            throw new Error("An insurance policy with this Ins_Code already exists");
        }
    }

    // Proceed to update the insurance record with the new data
    const updatedInsurance = await this.insuranceRepository.update(insuranceId, insuranceData);

    // Return a structured response with a success message and updated data
    return {
        message: "Insurance updated successfully",
        data: updatedInsurance,
    };
}


    
    async deleteInsurance(insuranceId) {
        return await this.insuranceRepository.delete(insuranceId);
    }
}

module.exports = new InsuranceService(InsuranceRepository);