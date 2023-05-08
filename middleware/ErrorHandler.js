const errorHandler = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    console.log(err)
    const message =
        err.message ||
        "Er is iets misgegaan op de server, probeer het later opnieuw.";

    return res.status(statusCode).json(message);

};


module.exports = errorHandler;
