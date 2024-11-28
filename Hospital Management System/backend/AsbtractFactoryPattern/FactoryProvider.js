const RatingFactory = require('./RatingFactory');
const PayrollFactory = require('./PayrollFactory');

class FactoryProvider {
    static getFactory(type) {
        try {
            switch (type.toLowerCase()) {
                case 'rating':
                    return new RatingFactory();
                case 'payroll':
                    return new PayrollFactory();
                default:
                    throw new Error(`FactoryProvider Error: No factory found for type '${type}'`);
            }
        } catch (error) {
            console.error(`FactoryProvider Error: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FactoryProvider;
