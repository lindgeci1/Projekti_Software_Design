const PayrollCreator = require("./PayrollCreator");
const RatingCreator = require("./RatingCreator");

class Factory {
    static createComponent(type, logCreation = false) {
        switch (type) {
            case "payroll":
                if (logCreation) {
                    console.log("CREATING A PAYROLL COMPONENT...");
                }
                return new PayrollCreator().createHandler();
            case "rating":
                if (logCreation) {
                    console.log("CREATING A RATING COMPONENT...");
                }
                return new RatingCreator().createHandler();
            default:
                throw new Error(`Unknown component type: ${type}`);
        }
    }
}

module.exports = Factory;
