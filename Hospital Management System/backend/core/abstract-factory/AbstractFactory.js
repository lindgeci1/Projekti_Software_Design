class AbstractFactory {
    createService() {
        throw new Error(`${this.constructor.name}: Method 'createService()' must be implemented.`);
    }
    createRepository() {
        throw new Error(`${this.constructor.name}: Method 'createRepository()' must be implemented.`);
    }
    createController() {
        throw new Error(`${this.constructor.name}: Method 'createController()' must be implemented.`);
    }
}
module.exports = AbstractFactory;
