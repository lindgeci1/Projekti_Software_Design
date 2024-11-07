const Patient = require('../../core/entities/Patient');
const { Op } = require('sequelize');
const Visit = require('../../core/entities/Visits');
const User = require('../../models/User');
const Room = require('../../core/entities/Room');
const Medicine = require('../../core/entities/Medicine');

class PatientRepository {
    constructor() {
        this.Patient = Patient;
        this.User = User;
        this.Room = Room;
        this.Medicine = Medicine;
        this.Visit = Visit;
    }

    async getPatientByEmail(email) {
        try {
            const patient = await this.Patient.findOne({ where: { Email: email } });
            if (!patient) throw new Error('Patient not found');
            return patient;
        } catch (error) {
            console.error('Error fetching patient by email:', error);
            throw error;
        }
    }

    async findAllPatients(userEmail, userRole) {
        try {
            let patients;
            if (userRole === 'admin' || userRole === 'doctor') {
                patients = await this.Patient.findAll();
            } else if (userRole === 'patient') {
                const patient = await this.getPatientByEmail(userEmail);
                patients = await this.Patient.findAll({ where: { Email: patient.Email } });
            } else {
                throw new Error('Forbidden');
            }

            return patients.map(patient => ({
                ...patient.toJSON(),
                Patient_Name: `${patient.Patient_Fname} ${patient.Patient_Lname}`
            }));
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }


    

    async findSinglePatient(patientId) {
        try {
            const patient = await this.Patient.findByPk(patientId);
            if (!patient) throw new Error('Patient not found');
            return patient;
        } catch (error) {
            console.error('Error fetching single patient:', error);
            throw error;
        }
    }

    async addPatient(patientData) {
        try {
            const { Personal_Number, Patient_Fname, Patient_Lname, Birth_Date, Blood_type, Email, Gender, Phone } = patientData;
            const personalNumberStr = String(Personal_Number);

            const personalNumberRegex = /^\d{10}$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const phoneRegex = /^(?:\+\d{1,2}\s?)?(?:\d{3})(?:\d{6})$/;
            const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;

            if (
                !personalNumberStr.match(personalNumberRegex) ||
                !Patient_Fname ||
                !Patient_Lname ||
                !Birth_Date ||
                !Blood_type.match(bloodTypeRegex) ||
                !Email.match(emailRegex) ||
                !Gender ||
                !Phone.match(phoneRegex)
            ) {
                throw new Error('Invalid input data');
            }

            const existingPatient = await this.Patient.findOne({
                where: { [Op.or]: [{ Email: Email }, { Phone: Phone }, { Personal_Number: Personal_Number }] }
            });

            if (existingPatient) throw new Error('Email, phone number, or personal number already exists');

            const user = await this.User.findOne({ where: { email: Email } });
            if (!user) throw new Error('No user found with the provided email');

            return await this.Patient.create({
                ...patientData,
                user_id: user.user_id
            });
        } catch (error) {
            console.error('Error adding patient:', error);
            throw error;
        }
    }

    async updatePatient(patientId, patientData) {
        try {
            const existingPatient = await this.Patient.findOne({
                where: {
                    [Op.or]: [
                        { Email: patientData.Email }, 
                        { Phone: patientData.Phone }, 
                        { Personal_Number: patientData.Personal_Number }
                    ],
                    Patient_ID: { [Op.ne]: patientId } // Ensure we don't match the current patient
                }
            });
    
            if (existingPatient) throw new Error('Email, phone number, or personal number already exists for another patient');
    
            const [updated] = await this.Patient.update(patientData, { where: { Patient_ID: patientId } });
            if (updated === 0) throw new Error('Patient not found or not updated');
    
            return true; // Successfully updated
        } catch (error) {
            console.error('Error updating patient:', error);
            throw error; // Rethrow the error for handling in the controller
        }
    }
    

    async deletePatient(patientId) {
        try {
            const patient = await this.Patient.findOne({ where: { Patient_ID: patientId } });
            if (!patient) throw new Error('Patient not found');

            await this.Patient.destroy({ where: { Patient_ID: patientId } });
            await this.User.destroy({ where: { email: patient.Email } });

            return true;
        } catch (error) {
            console.error('Error deleting patient and user:', error);
            throw error;
        }
    }

    async checkPatientExistence(patientId) {
        try {
            const patient = await this.Patient.findByPk(patientId);
            if (!patient) throw new Error('Patient not found');
            return true;
        } catch (error) {
            console.error('Error checking patient existence:', error);
            throw error;
        }
    }

    async findPatientByPersonalNumber(personalNumber) {
        try {
            const patient = await this.Patient.findOne({ where: { Personal_Number: personalNumber } });
            if (!patient) throw new Error('Patient not found');
            return patient;
        } catch (error) {
            console.error('Error fetching patient by personal number:', error);
            throw error;
        }
    }

    async findMedicineCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Repository:', patientId); // Log patientId
            // Fetch medicines associated with the patient
            const medicines = await this.Medicine.findAll({
                where: { Patient_ID: patientId }
            });
    
            if (!medicines.length) {
                throw new Error('No medicines found for this patient1');
            }
    
            // Extract the costs
            const costs = medicines.map(medicine => medicine.M_Cost);
    
            return { costs }; // Return the costs as an object
        } catch (error) {
            console.error('Error fetching medicine cost:', error);
            throw new Error('Internal Server Error'); // Throw a new error for proper error handling
        }
    }

    async findRoomCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Repository:', patientId);
            
            // Fetch the room associated with the patient
            const room = await this.Room.findOne({
                where: { Patient_ID: patientId }
            });
    
            // Check if a room was found
            if (!room) {
                console.log(`Room not found for patientId: ${patientId}`); // Log if room not found
                throw new Error('Room not found for this patient');
            }
    
            // Return the room cost
            return { Room_Cost: room.Room_cost }; // Ensure the field matches what you return in the response
        } catch (error) {
            console.error('Error fetching room cost:', error);
            throw new Error('Internal Server Error'); // Propagate the error
        }
    }
    
    
    
    
    
    

    async findEmailByPatientId(patientId) {
        try {
            console.log('Received patientId:', patientId); // Log the received patientId
            const patient = await this.Patient.findByPk(patientId, { attributes: ['Email'] });
            if (!patient) throw new Error('Patient not found');
            console.log('Fetched patient:', patient); // Log the fetched patient
            return patient.Email;
        } catch (error) {
            console.error('Error fetching patient email by ID:', error);
            throw error;
        }
    }

    async checkPatientVisit(patientId) {
        try {
            const visit = await this.Visit.findOne({ where: { Patient_ID: patientId } });
            return !!visit;
        } catch (error) {
            console.error('Error checking patient visit:', error);
            throw error;
        }
    }
}

module.exports = new PatientRepository();
