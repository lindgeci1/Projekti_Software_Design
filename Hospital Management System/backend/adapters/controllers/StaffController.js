const StaffPort = require("../../ports/StaffPort");

class StaffController {
    // Get all staff based on the user's role
    async findAllStaff(req, res) {
        console.log("Fetching staff for user:", req.user);
        try {
            const staff = await StaffPort.findAllStaff(req.user);
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a single staff member by their ID
    async findSingleStaff(req, res) {
        try {
            const staff = await StaffPort.findSingleStaff(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: "Staff member not found" });
            }
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Find a staff member by email
    async findStaffByEmail(req, res) {
        try {
            const staff = await StaffPort.findStaffByEmail(req.params.email);
            if (!staff) {
                return res.status(404).json({ message: "Staff member not found" });
            }
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a list of all doctors
    async findDoctors(req, res) {
        try {
            const doctors = await StaffPort.findDoctors();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add a new staff member
    async addStaff(req, res) {
        try {
            const newStaff = await StaffPort.addStaff(req.body);
            res.status(201).json(newStaff);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update an existing staff member's details
    async updateStaff(req, res) {
        try {
            await StaffPort.updateStaff(req.params.id, req.body);
            res.status(200).json({ message: 'Staff updated successfully' });
        } catch (error) {
            console.error('Error updating staff:', error);
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a staff member
    async deleteStaff(req, res) {
        try {
            const deletedStaff = await StaffPort.deleteStaff(req.params.id);
            if (!deletedStaff) {
                return res.status(404).json({ message: "Staff member not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Check if a staff member exists by their ID
    async checkStaffExistence(req, res) {
        try {
            const exists = await StaffPort.checkStaffExistence(req.params.id);
            res.status(200).json({ exists });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get doctor details based on the staff email
    async getDoctorByStaffEmail(req, res) {
        try {
            const doctor = await StaffPort.getDoctorByStaffEmail(req.params.email);
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json(doctor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new StaffController();
