const EmergencyContact = require('../../core/entities/Emergency_Contact');
const Patient = require('../../core/entities/Patient');

class EmergencyContactRepository {
    constructor() {
        this.EmergencyContact = EmergencyContact;
        this.Patient = Patient;
    }

    async findAll() {
        console.log("Repository: Fetching all emergency contacts");
        try {
            const emergencyContacts = await this.EmergencyContact.findAll({
                include: [{ model: this.Patient, attributes: ["Patient_Fname", "Patient_Lname"] }],
            });
    
            if (!emergencyContacts || emergencyContacts.length === 0) {
                console.log("Repository: No emergency contacts found");
                return [];  // Return an empty array if no contacts are found
            }
    
            console.log("Repository: All emergency contacts fetched:", emergencyContacts);
            return emergencyContacts;
        } catch (error) {
            console.error("Error fetching emergency contacts:", error);
            return [];  // Return an empty array in case of an error
        }
    }
    

   async create(data) {
    const { Patient_ID, Contact_Name, Phone, Relation } = data;

    // Check if required fields are provided
    if (!Patient_ID || !Contact_Name || !Phone || !Relation) {
        throw new Error('Patient ID, Contact Name, Phone, and Relation are required.');
    }

    // Create new emergency contact
    const newContact = await this.EmergencyContact.create(data);

    // Return success message along with created data
    return {
        message: 'Emergency contact created successfully.',
        createdData: newContact
    };
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
