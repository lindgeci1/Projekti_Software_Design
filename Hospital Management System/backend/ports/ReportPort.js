// ReportPort.js
const ReportService = require("../core/services/ReportService");

class ReportPort {
    // Fetch reports based on user role
    async fetchReportsFromDB(req, res) {
        console.log("Calling ReportService.fetchReports with user:", req.user);
        return await ReportService.fetchReportsFromDB(req, res);
    }

    // Fetch all reports
    async findAllReports(req, res) {
        return await ReportService.findAllReports(req, res);
    }

    // Check if a report exists for a given patient
    async checkPatientReport(req, res) {
        return await ReportService.checkPatientReport(req, res);
    }

    // Create PDF report
    async createPdf(req, res) {
        return await ReportService.createPdf(req, res);
    }

    // Send email with PDF attachment
    async sendEmailWithPdf(req, res) {
        return await ReportService.sendEmailWithPdf(req, res);
    }

    // Fetch the PDF report
    // async fetchPdf(req, res) {
    //     return await ReportService.fetchPdf(req, res);
    // }

    // Save report to the database
    async saveReportToDB(req, res) {
        return await ReportService.saveReportToDB(req, res);
    }

    // Delete the report
    async deleteReport(req, res) {
        return await ReportService.deleteReport(req, res);
    }
}

module.exports = new ReportPort();
