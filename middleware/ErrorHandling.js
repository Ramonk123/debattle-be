const errorHandling = (err, req, res) => {
    console.log(err)
    const statusCode = err.statusCode || 500;
    const message =
        err.message ||
        "Er is iets misgegaan op de server, probeer het later opnieuw.";

    res.status(statusCode).json({ message: message });
};


module.exports = errorHandling;
