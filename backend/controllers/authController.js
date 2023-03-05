// Imports
const errors = require("../configs/error.codes.json");
const { jwt: jwtConfig } = require("../configs/utils.config.json");
const ticketConfig = require("../configs/ticket.config.json");
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
  try {
    const {
      name = undefined,
      phone = undefined,
      email = undefined,
      usn = undefined,
      college = undefined,
      password = undefined,
    } = req.body;

    if (name === undefined)
      return res.status(400).send(Response(errors[400].nameRequired));
    if (phone === undefined)
      return res.status(400).send(Response(errors[400].phoneRequired));
    if (email === undefined)
      return res.status(400).send(Response(errors[400].emailRequired));
    if (usn === undefined)
      return res.status(400).send(Response(errors[400].usnRequired));
    if (college === undefined)
      return res.status(400).send(Response(errors[400].collegeRequired));
    if (password === undefined)
      return res.status(400).send(Response(errors[400].passwordRequired));

    const user = await User.create({
      name,
      phone,
      email,
      usn,
      college,
      password: await bcryptHash(password),
    });

    // Request email verification
    await user.createNewTicket(ticketConfig.purposes.EMAIL_VERIFICATION);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.user = await User.findById(user._id, "-password");
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

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: true, TODO: Uncomment later
      // sameSite: "none", TODO: Uncomment later
      maxAge: jwtConfig.ages.login * 1000,
    });
    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.user = await User.findById(user._id, "-password");
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
  if (!res.locals.data)
    res.locals.data = {};
  res.locals.data.authenticated = !!res.locals.user;

  return next();
};
