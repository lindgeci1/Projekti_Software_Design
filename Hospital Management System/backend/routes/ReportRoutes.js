const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const FactoryProvider = require("../AsbtractFactoryPattern/FactoryProvider"); 

class ReportRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = FactoryProvider.getFactory('report').createController();  // Create controller via factory
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/report/create-pdf', authenticateToken(['admin', 'doctor', 'patient']), this.controller.createPdf.bind(this.controller));
        this.router.post('/report/send-email', authenticateToken(['admin', 'doctor', 'patient']), this.controller.sendEmailWithPdf.bind(this.controller));
        this.router.post('/report/save-report-to-db', authenticateToken(['admin', 'doctor', 'patient']), this.controller.saveReportToDB.bind(this.controller));
        this.router.get('/report/fetch-reports', authenticateToken(['admin', 'doctor', 'patient']), this.controller.fetchReportsFromDB.bind(this.controller));
        this.router.get('/reports/check/:patientId', authenticateToken(['admin', 'doctor', 'patient']), this.controller.checkPatientReport.bind(this.controller));
        this.router.get('/reports', authenticateToken(['admin', 'doctor', 'patient']), this.controller.findAllReports.bind(this.controller));
        this.router.delete('/report/delete/:id', authenticateToken(['admin', 'doctor', 'patient']), this.controller.deleteReport.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ReportRoutes().getRouter();
