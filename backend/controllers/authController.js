// Imports
const errors = require("../configs/error.codes.json");
const { jwt: jwtConfig } = require("../configs/utils.config.json");
const queryConfig = require("../configs/query.config.json");
const User = require("../models/User");
const Response = require("../models/standard.response.model");
const { bcryptHash, errorHandler, quoteRegExp } = require("../utils/utils");

// Constants
const errorMessages = Object.freeze({
  byMessage: {
    "incorrect email": errors[404].emailNotFound,
    "incorrect password": errors[403].passwordMismatch,
  },
  byCodes: {
    11000: errors[403].emailAlreadyInUse,
  },
});

const getError = (error) => {
  let msg = "";

  // Check by message
  if ((msg = errorMessages.byMessage[error.message])) return msg;

  // Check by code
  if ((msg = errorMessages.byCodes[error.code])) return msg;

  // Unhandled error
  return errorHandler(error).message;
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
  } catch (err) {
    return res.status(400).json(Response(getError(err)));
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
  } catch (err) {
    return res.status(400).json(Response(getError(err)));
  }

  return next();
};

module.exports.logout_get = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });

  return next();
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, "-password");
    if (!user) return res.status(404).send(Response(errors[404].userNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.user = user;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.searchUser = async (req, res, next) => {
  try {
    let {
      email = undefined,
      name = undefined,
      usn = undefined,
      email_verified = undefined,
    } = req.query;

    if (!email && !name && !usn && (email_verified === undefined || !/^(true|false)$/i.test(email_verified)))
      return res.status(400).send(Response(errors[400].searchQueryRequired));
    
    if (email)
      email = quoteRegExp(email);
    if (name)
      name = quoteRegExp(name);
    if (usn)
      usn = quoteRegExp(usn);
    if (typeof email_verified === "string")
      email_verified = email_verified.toLowerCase() === "true";

    const query = {};
    if (email)
      query.email = { $regex: queryConfig["search.options"].email.replace("{email}", email), $options: "i" };
    if (name)
      query.name = { $regex: queryConfig["search.options"].name.replace("{name}", name), $options: "i" };
    if (usn)
      query.usn = { $regex: queryConfig["search.options"].usn.replace("{usn}", usn), $options: "i" };
    if (typeof email_verified === "boolean")
      query.email_verified = email_verified;

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.results = await User.find(query, "-password");
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

