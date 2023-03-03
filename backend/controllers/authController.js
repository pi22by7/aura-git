// Imports
const errors = require("../configs/error.codes.json");
const { jwt: jwtConfig } = require("../configs/utils.config.json");
const User = require("../models/User");
const Response = require("../models/standard.response.model");
const { bcryptHash, errorHandler } = require("../utils/utils");

// Constants
const errorMessages = Object.freeze({
  byCodes: {
    11000: {
      status: 403,
      message: errors[403].emailAlreadyInUse,
    },
  },
});

const getError = (error) => {
  let msg;

  // Check by code
  if ((msg = errorMessages.byCodes[error.code])) return msg;

  // Unhandled error
  return errorHandler(error);
};

// Body
module.exports.signup_post = async (req, res, next) => {
  const { name, email, usn, password } = req.body;

  try {
    const user = await User.create({ name, email, usn, password: await bcryptHash(password) });
    const token = user.createToken();

    res.cookie("jwt", token, { httpOnly: true, maxAge: jwtConfig.ages.login * 1000 });

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.user = user._id;
    res.locals.data.name = name;
    res.locals.status = 201;
  } catch (error) {
    const { status, message } = getError(error);
    return res.status(status).json(Response(message));
  }

  return next();
};

module.exports.login_post = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = user.createToken();

    res.cookie("jwt", token, { httpOnly: true, maxAge: jwtConfig.ages.login * 1000 });
    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.user = user._id;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).json(Response(message));
  }

  return next();
};

module.exports.logout_get = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });

  return next();
};

module.exports.authStatusController = (req, res, next) => {
  return res.status(200).send(Response(false, {
    authenticated: !!res.locals.user,
  }));
};
