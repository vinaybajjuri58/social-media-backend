const pathNotFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "No such path exists",
  });
};
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error occured",
    errMessage: err.errMessage,
  });
  next();
};
module.exports = {
  pathNotFoundHandler,
  errorHandler,
};
