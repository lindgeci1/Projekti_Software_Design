const PatientPort = require("../../ports/PatientPort");

class PatientController {
    async findAllPatients(req, res) {
        console.log("Fetching patients for user:", req.user);
        try {
            const patients = await PatientPort.findAllPatients(req.user);
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSinglePatient(req, res) {
        try {
            const patient = await PatientPort.findSinglePatient(req.params.id);
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addPatient(req, res) {
        try {
            const newPatient = await PatientPort.addPatient(req.body);
            res.status(201).json(newPatient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePatient(req, res) {
        try {
            await PatientPort.updatePatient(req.params.id, req.body);
            res.status(200).json({ message: 'Patient updated successfully' });
        } catch (error) {
            console.error('Error updating patient:', error);
            res.status(400).json({ error: error.message }); // Send a 400 error with the message
        }
    }
    

    async deletePatient(req, res) {
        try {
            const deletedPatient = await PatientPort.deletePatient(req.params.id);
            if (!deletedPatient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async checkPatientExistence(req, res) {
        try {
            const exists = await PatientPort.checkPatientExistence(req.params.id);
            res.status(200).json({ exists });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findPatientByPersonalNumber(req, res) {
        try {
            const patient = await PatientPort.findPatientByPersonalNumber(req.params.personalNumber);
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findRoomCostByPatientId(req, res) {
        try {
            const patientId = req.params.patientId; // Correctly access patientId
            console.log('Received patientId in Controller:', patientId); // Log patientId
            
            // Validate that patientId is provided
            if (!patientId) {
                return res.status(400).json({ error: 'Patient ID is required' }); // Respond with an error if patientId is not present
            }
    
            // Call the service layer
            const roomCost = await PatientPort.findRoomCostByPatientId(patientId);
            res.status(200).json(roomCost); // Send the response
        } catch (error) {
            console.error('Error in Controller:', error);
            res.status(500).json({ error: error.message }); // Handle the error
        }
    }
    
    
    
    async findMedicineCostByPatientId(req, res) {
        try {
            console.log('Request parameters:', req.params); // Log all parameters
            const patientId = req.params.patientId; // Correctly retrieve patientId
            console.log('Received patientId in Controller:', patientId);
            const medicineCost = await PatientPort.findMedicineCostByPatientId(patientId);
            res.status(200).json(medicineCost);
        } catch (error) {
            console.error('Error in Controller:', error);
            res.status(500).json({ error: error.message });
        }
    }
    
    
    

    async findEmailByPatientId(req, res) {
        try {
            const email = await PatientPort.findEmailByPatientId(req.params.patientId);
            if (!email) {
                return res.status(404).json({ message: "Email not found" });
            }
            res.status(200).json(email);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async checkPatientVisit(req, res) {
        try {
            const visitExists = await PatientPort.checkPatientVisit(req.params.id);
            res.status(200).json({ visitExists });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PatientController();