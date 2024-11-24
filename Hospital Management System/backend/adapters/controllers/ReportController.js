class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    // Fetch reports based on user role
    async fetchReportsFromDB(req, res) {
        console.log("Fetching reports for user:", req.user);
        try {
            await this.reportService.fetchReportsFromDB(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all reports
    async findAllReports(req, res) {
        try {
            await this.reportService.findAllReports(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Check if a report exists for a given patient
    async checkPatientReport(req, res) {
        try {
            await this.reportService.checkPatientReport(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Generate a PDF report
    async createPdf(req, res) {
        try {
            await this.reportService.createPdf(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Send email with PDF attachment
    async sendEmailWithPdf(req, res) {
        try {
            await this.reportService.sendEmailWithPdf(req, res);
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
            await this.reportService.saveReportToDB(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete the report
    async deleteReport(req, res) {
        try {
            await this.reportService.deleteReport(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ReportController;
