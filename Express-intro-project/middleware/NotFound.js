const NotFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
};

export default NotFound;