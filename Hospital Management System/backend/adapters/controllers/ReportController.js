const ReportPort = require("../../ports/ReportPort");

class ReportController {
    // Fetch reports based on user role
    async fetchReportsFromDB(req, res) {
        console.log("Fetching reports for user:", req.user);
        try {
            await ReportPort.fetchReportsFromDB(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all reports
    async findAllReports(req, res) {
        try {
            await ReportPort.findAllReports(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Check if a report exists for a given patient
    async checkPatientReport(req, res) {
        try {
            await ReportPort.checkPatientReport(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Generate a PDF report
    async createPdf(req, res) {
        try {
            await ReportPort.createPdf(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Send email with PDF attachment
    async sendEmailWithPdf(req, res) {
        try {
            await ReportPort.sendEmailWithPdf(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Fetch the PDF report
    // async fetchPdf(req, res) {
    //     try {
    //         await ReportPort.fetchPdf(req, res);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    // Save report to the database
    async saveReportToDB(req, res) {
        try {
            await ReportPort.saveReportToDB(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete the report
    async deleteReport(req, res) {
        try {
            await ReportPort.deleteReport(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReportController();
