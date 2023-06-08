const errorHandler = (err, req, res, next) => {
    console.log('hier kom ik niet')
    console.log(err.message)
    const statusCode = err.statusCode || 500;
    const message =
        err.message ||
        "Er is iets misgegaan op de server, probeer het later opnieuw.";

     return res.status(statusCode).json(message);

};


module.exports = errorHandler;
