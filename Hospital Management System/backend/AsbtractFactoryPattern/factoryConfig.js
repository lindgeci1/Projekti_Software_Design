const PayrollFactory = require('./PayrollFactory');
const RatingFactory = require('./RatingFactory');
const factoryConfig = {
    rating: RatingFactory,
    payroll: PayrollFactory,
    // Add more factories here dynamically
};

module.exports = factoryConfig;