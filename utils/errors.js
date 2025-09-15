const error400 = new Error("Invalid data passed to request");
error400.name = "ValidationError";
error400.code = 400;

const error404 = new Error("Requested resource could not be found");
error404.name = "DocumentNotFoundError";
error404.code = 404;

const error500 = new Error("An error has occurred on the server");
error500.name = "ServerError";
error500.code = 500;

const error409 = new Error("A user with this email already exists");
error409.name = "ConflictError";
error409.code = 409;

const error401 = new Error("Incorrect email or password");
error401.name = "UnauthorizedError";
error401.code = 401;

// function passed to every requests .catch() block
const serverErrorHandler = (req, res, error) => {
  console.error(error);
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(error400.code).send({ message: error400.message });
  }
  if (error.name === "DocumentNotFoundError") {
    return res.status(error404.code).send({ message: error404.message });
  }
  if (error.code === 11000) {
    return res.status(error409.code).send({ message: error409.message });
  }
  if (error.message === "Incorrect email or password") {
    return res.status(error401.code).send({ message: error401.message });
  }

  return res.status(error500.code).send({ message: error500.message });
};

// this error message never gets used because when serverErrorHandler, which gets used
// on every .catch block, recieves an error with the name "DocumentNotFoundError",
// it will used the error404 objects message, which is "Requested resource could not be found"
const orFailErrorHandler = () => {
  const error = new Error("Item ID not found");
  error.name = "DocumentNotFoundError";
  error.code = 404;
  throw error;
};

module.exports = { serverErrorHandler, orFailErrorHandler };
