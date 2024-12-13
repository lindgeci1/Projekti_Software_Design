const ReportRepository = require("../../adapters/repositories/ReportRepository");

class ReportService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }

    // Call the method to fetch reports and visits based on user role
    async fetchReportsFromDB(req, res) {
        try {
            await this.reportRepository.fetchReportsFromDB(req, res);
        } catch (error) {
            console.error('Error fetching reports in ReportService:', error);
            res.status(500).json({ error: 'Error fetching reports' });
        }
    }

    // Call the method to find all reports
    async findAllReports(req, res) {
        try {
            await this.reportRepository.findAllReports(req, res);
        } catch (error) {
            console.error('Error fetching all reports in ReportService:', error);
            res.status(500).json({ error: 'Error fetching reports' });
        }
    }

    // Check if a report exists for a given patient
    async checkPatientReport(req, res) {
        try {
            await this.reportRepository.checkPatientReport(req, res);
        } catch (error) {
            console.error('Error checking patient report in ReportService:', error);
            res.status(500).json({ error: 'Error checking patient report' });
        }
    }

    // Generate PDF report
    async createPdf(req, res) {
        try {
            await this.reportRepository.createPdf(req, res);
        } catch (error) {
            console.error('Error generating PDF in ReportService:', error);
            res.status(500).json({ error: 'Error generating PDF' });
        }
    }

    // Send email with PDF attachment
    async sendEmailWithPdf(req, res) {
        try {
            await this.reportRepository.sendEmailWithPdf(req, res);
        } catch (error) {
            console.error('Error sending email in ReportService:', error);
            res.status(500).json({ error: 'Error sending email with PDF' });
        }
    }

    // Fetch the PDF report
    // async fetchPdf(req, res) {
    //     try {
    //         await this.reportRepository.fetchPdf(req, res);
    //     } catch (error) {
    //         console.error('Error fetching PDF in ReportService:', error);
    //         res.status(500).json({ error: 'Error fetching PDF' });
    //     }
    // }

    // Save report to the database
    async saveReportToDB(req, res) {
        try {
            await this.reportRepository.saveReportToDB(req, res);
        } catch (error) {
            console.error('Error saving report in ReportService:', error);
            res.status(500).json({ error: 'Error saving report' });
        }
    }

    // Delete the report
    async deleteReport(req, res) {
        try {
            await this.reportRepository.deleteReport(req, res);
        } catch (error) {
            console.error('Error deleting report in ReportService:', error);
            res.status(500).json({ error: 'Error deleting report' });
        }
    }
}

module.exports = new ReportService(ReportRepository);
