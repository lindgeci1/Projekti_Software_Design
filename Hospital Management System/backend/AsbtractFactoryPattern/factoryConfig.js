const BillFactory = require('./BillFactory');
const ReportFactory = require('./ReportFactory');
const factoryConfig = {
    report: ReportFactory,
    bill: BillFactory,
    // Add more factories here dynamically
};

module.exports = factoryConfig;