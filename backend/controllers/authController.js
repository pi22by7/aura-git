// Imports
const errors = require("../configs/error.codes.json");
const { jwt: jwtConfig } = require("../configs/utils.config.json");
const User = require("../models/User");
const Response = require("../models/standard.response.model");
const { bcryptHash } = require("../utils/utils");

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

const getError = error => {
  let msg = "";

  // Check by message
  if ((msg = errorMessages.byMessage[error.message]))
    return msg;
  
  // Check by code
  if ((msg = errorMessages.byCodes[error.code]))
    return msg;
  
  // Check if the error is a User validation error
  if ("message" in error && error.message.includes("user validation failed"))
    // Return first error
    return Object.values(error.errors)[0].properties.message;

  // Unhandled error
  if ("message" in error)
    return error.message;
  return errors[500];
};

// Body
module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password: await bcryptHash(password) });
    const token = user.createToken();

    res.cookie("jwt", token, { httpOnly: true, maxAge: jwtConfig.ages.login * 1000 });
    res.status(201).json(Response(false, { user: user._id, name: name }));
  } catch (err) {
    console.error("[authController]", err);
    res.status(400).json(Response(getError(err)));
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = user.createToken();
    
    res.cookie("jwt", token, { httpOnly: true, maxAge: jwtConfig.ages.login * 1000 });
    res.status(200).json(Response(false, { user: user._id }));
  } catch (err) {
    console.error("[authController]", err);
    res.status(400).json(Response(getError(err)));
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send(Response(false));
};
