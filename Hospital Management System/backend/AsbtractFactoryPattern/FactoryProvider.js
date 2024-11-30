const factoryConfig = require('./factoryConfig');

class FactoryProvider {
    static getFactory(type) {
        const FactoryClass = factoryConfig[type.toLowerCase()];
        if (!FactoryClass) {
            throw new Error(`FactoryProvider Error: No factory found for type '${type}'`);
        }
        try {
            return new FactoryClass();
        } catch (error) {
            console.error(`FactoryProvider Error: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FactoryProvider;

