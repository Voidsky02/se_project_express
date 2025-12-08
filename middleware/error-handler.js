const errorHandler = (error, req, res, next) => {
    console.error(error);
    // statusCode = 500 when that property doesn't exist in the error object
    const {statusCode = 500, message} = error; // this syntax is saying "pull these properties out of the error object and make real variables”"
    return res.status(statusCode).send({message: statusCode === 500 ? 'An error occurred on the server' : message});
}

module.exports = { errorHandler }