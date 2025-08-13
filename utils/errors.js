// perhaps i should use new Error() class creator in future
const error400 = { code: 400, message: "Invalid data passed to request" };
const error404 = {
  code: 404,
  message: "Requested resource could not be found",
};
const error500 = { code: 500, message: "An error has occurred on the server." };

// function passed to every requests .catch() block
const serverErrorHandler = (req, res, error) => {
  console.error(error);
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(error400.code).send({ message: error400.message });
  } else if (error.name === "DocumentNotFoundError") {
    return res.status(error404.code).send({ message: error404.message });
  } else {
    return res.status(error500.code).send({ message: error500.message });
  }
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
