import colors from "colors";

const colorMethods = {
  GET: "green",
  POST: "blue",
  PUT: "yellow",
  DELETE: "red",
};

const logger = (req, res, next) => {
  const color = colorMethods[req.method] || 'white';

  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color
    ]
  );
  next();
};

export default logger;
