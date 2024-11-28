const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const Factory = require("../FactoryPattern/Factory"); 

class ReportRoutes {
    constructor() {
        this.router = express.Router();
        this.reportController = Factory.createComponent('report');  // Create controller via factory using the type parameter
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/report/create-pdf', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.createPdf.bind(this.reportController));
        this.router.post('/report/send-email', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.sendEmailWithPdf.bind(this.reportController));
        // this.router.get('/report/fetch-pdf', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.fetchPdf.bind(this.reportController));
        this.router.post('/report/save-report-to-db', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.saveReportToDB.bind(this.reportController));
        this.router.get('/report/fetch-reports', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.fetchReportsFromDB.bind(this.reportController));
        this.router.get('/reports/check/:patientId', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.checkPatientReport.bind(this.reportController));
        this.router.get('/reports', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.findAllReports.bind(this.reportController));
        this.router.delete('/report/delete/:id', authenticateToken(['admin', 'doctor', 'patient']), this.reportController.deleteReport.bind(this.reportController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ReportRoutes().getRouter();
