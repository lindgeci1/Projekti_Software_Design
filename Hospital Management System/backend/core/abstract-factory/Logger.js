class Logger {
    static logError(context, message) {
        console.error(`[${context.constructor.name}] Error: ${message}`);
    }
}

module.exports = Logger;
