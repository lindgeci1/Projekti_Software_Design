const EmergencyContact = require('../../core/entities/Emergency_Contact');
const Patient = require('../../core/entities/Patient');
const { Op } = require('sequelize');
const EmergencyContactPort = require('../../ports/Emergency_ContactPort');
class EmergencyContactRepository extends EmergencyContactPort{
    constructor() {
        super();
        this.EmergencyContact = EmergencyContact;
        this.Patient = Patient;
    }

    async findAll() {
        console.log("Repository: Fetching all bills");
        const bills = await this.EmergencyContact.findAll({
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
        console.log("Repository: All bills fetched:", bills);
        return bills;
    }
    

   async create(data) {
    const { Patient_ID, Contact_Name, Phone, Relation } = data;

    // Check if required fields are provided
    if (!Patient_ID || !Contact_Name || !Phone || !Relation) {
        throw new Error('Patient ID, Contact Name, Phone, and Relation are required.');
    }

    const existingContact = await EmergencyContact.findOne({ where: { Phone } });
        if (existingContact) {
            throw new Error("Emergency contact with the same phone number already exists");
        
        }
    // Create new emergency contact
    const newContact = await this.EmergencyContact.create(data);

    // Return success message along with created data
    return {
        message: 'Emergency contact created successfully.',
        createdData: newContact
    };
}

async findById(contactId) {
    return await this.EmergencyContact.findByPk(contactId, { include: [this.Patient] });
}


async update(id, data) {
    const { Patient_ID, Contact_Name, Phone, Relation } = data;

    // Check if required fields are provided
    if (!Patient_ID || !Contact_Name || !Phone || !Relation) {
        throw new Error('Patient ID, Contact Name, Phone, and Relation are required.');
    }

    try {
        // Find the emergency contact by ID to check if it exists
        const existingContact = await this.EmergencyContact.findByPk(id);
        if (!existingContact) {
            throw new Error('Emergency contact not found.');
        }

        // Check if the phone number is changing
        if (existingContact.Phone !== Phone) {
            const existingContactWithSamePhone = await this.EmergencyContact.findOne({
                where: {
                    Phone: Phone,
                    Contact_ID: { [Op.ne]: id } // Exclude the current contact by ID
                }
            });

            if (existingContactWithSamePhone) {
                throw new Error("Phone number is already in use by another emergency contact");
            }
        }

        // Update the emergency contact
        const [updatedRowsCount] = await this.EmergencyContact.update(data, { where: { Contact_ID: id } });

        if (updatedRowsCount === 0) {
            throw new Error('Failed to update emergency contact: No rows were updated.');
        }

        return {
            message: 'Emergency contact updated successfully.',
            updatedData: data, // returning the updated data
        };
    } catch (error) {
        console.error('Error updating emergency contact:', error); // Log the error for debugging
        throw new Error(`Error updating emergency contact: ${error.message}`);
    }
}




    async delete(id) {
        try {
            const deleted = await this.EmergencyContact.destroy({ where: { Contact_ID: id } });

            if (deleted === 0) {
                console.log("No records found to delete.");
                return { message: "No emergency contact found to delete.", deleted: false };
            }

            console.log("Record deleted successfully.");
            return { message: "Emergency contact deleted successfully.", deleted: true };

        } catch (error) {
            console.error("Error deleting emergency contact:", error);
            return { message: "Error occurred while deleting emergency contact.", error: error.message };
        }
    }

    async findByPatientEmail(email) {
        const patient = await this.Patient.findOne({ where: { Email: email } });
        if (!patient) throw new Error("Patient not found");
        
        return await this.EmergencyContact.findAll({
            where: { Patient_ID: patient.Patient_ID },
            include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
        });
    }
}

module.exports = new EmergencyContactRepository();
