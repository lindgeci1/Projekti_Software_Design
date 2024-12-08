const RatingFactory = require("./RatingFactory");
const PayrollFactory = require("./PayrollFactory");

class Factory {

    static createInstance(Constructor, name) {
        try {
            return new Constructor();  // Create instance of the provided class
        } catch (error) {
            console.error(`Error creating ${name}:`, error.message);
            throw new Error(`Failed to create ${name}.`);
        }
    }

    //qitu i shton ma lehte
    static componentMap = {
        'rating': RatingFactory,
        'payroll': PayrollFactory
    };

    static createComponent(type) {
        const FactoryClass = Factory.componentMap[type.toLowerCase()];

        if (!FactoryClass) {
            throw new Error(`Invalid component type: ${type}. Must be one of ${Object.keys(Factory.componentMap).join(', ')}.`);
        }

        // Use the Factory class to create the components
        const repository = FactoryClass.createRepository();
        const service = FactoryClass.createService(repository);
        const controller = FactoryClass.createController(service);

        return controller;
    }
}

module.exports = Factory;
