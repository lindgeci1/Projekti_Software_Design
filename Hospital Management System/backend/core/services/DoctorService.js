const DoctorRepository = require("../../adapters/repositories/DoctorRepository");

class DoctorService {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async findAllDoctors() {
    console.log("Service: Finding all doctors");
    return await this.doctorRepository.findAll();
  }

  async findSingleDoctor(doctorId) {
    console.log(`Service: Finding doctor with ID ${doctorId}`);
    return await this.doctorRepository.findById(doctorId);
  }

  async addDoctor(doctorData) {
    console.log("Service: Adding new doctor with data:", doctorData);
    const { Qualifications, Emp_ID, Specialization } = doctorData;

    if (!Qualifications) {
      throw new Error("Qualifications are required");
    }
    if (!Emp_ID) {
      throw new Error("Employee ID is required");
    }
    if (!Specialization) {
      throw new Error("Specialization is required");
    }

    // Check if doctor with the same Emp_ID already exists
    const existingDoctor = await this.doctorRepository.findById(Emp_ID);
    if (existingDoctor) {
      throw new Error("A doctor with this Employee ID already exists");
    }

    return await this.doctorRepository.create(doctorData);
  }

  async updateDoctor(doctorId, doctorData) {
    console.log(`Service: Updating doctor with ID ${doctorId}`);
    const { Qualifications, Emp_ID, Specialization } = doctorData;

    if (!Qualifications) {
      throw new Error("Qualifications are required");
    }
    if (!Emp_ID) {
      throw new Error("Employee ID is required");
    }
    if (!Specialization) {
      throw new Error("Specialization is required");
    }

    // Check if the doctor exists before updating
    const existingDoctor = await this.doctorRepository.findById(doctorId); // This will throw if not found
    if (!existingDoctor) {
      throw new Error("Doctor not found");
    }

    // Only check for the Emp_ID if it's being changed
    if (existingDoctor.Emp_ID !== Emp_ID) {
      // Check if another doctor with the same Emp_ID already exists
      const doctorWithSameEmpId = await this.doctorRepository.findById(Emp_ID);
      if (doctorWithSameEmpId) {
        throw new Error("A doctor with this Employee ID already exists");
      }
    }
    const updatedDoctor = await this.doctorRepository.update(doctorId, doctorData);

    // Log or return a success message
    console.log("Doctor updated successfully:", updatedDoctor);

    return {
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    };
  }

  async deleteDoctor(doctorId) {
    console.log(`Service: Deleting doctor with ID ${doctorId}`);
    // Check if the doctor exists before deleting
    await this.doctorRepository.findById(doctorId); // This will throw if not found

    return await this.doctorRepository.delete(doctorId);
  }
}

module.exports = new DoctorService(DoctorRepository);