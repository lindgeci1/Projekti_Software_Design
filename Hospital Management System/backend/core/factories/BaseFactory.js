class BaseFactory {
    static createRepository() {
        throw new Error('createRepository() must be implemented.');
    }

    static createService() {
        throw new Error('createService() must be implemented.');
    }

    static createController() {
        throw new Error('createController() must be implemented.');
    }
}

module.exports = BaseFactory;
