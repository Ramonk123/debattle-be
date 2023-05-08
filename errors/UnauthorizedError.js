class UnauthorizedError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

    }
}

module.exports = UnauthorizedError;
