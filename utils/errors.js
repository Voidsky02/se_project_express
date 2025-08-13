const error400 = { code: 400, message: "Invalid data passed to request" };
const error404 = {
  code: 404,
  message: "Requested resource could not be found",
};
const error500 = { code: 500, message: "An error has occurred on the server." };

module.exports = { error400, error404, error500 };
