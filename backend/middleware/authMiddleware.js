// Imports
const jwt = require("jsonwebtoken");
const errors = require("../configs/error.codes.json");
const User = require("../models/User");
const Response = require("../models/standard.response.model");
const { jwtDecoded } = require("../utils/utils");

// Body
async function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).send(Response(errors[401].authRequired));

  try {
    const decoded = await jwtDecoded(token);

    if (!decoded)
      // Invalid/Expired token
      return res.status(401).send(Response(errors[401].invalidOrExpiredToken));
    
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).send(Response(errors[404].userNotFound));
    
    if (decoded.last_password_reset !== user._profile_information.last_password_reset.getTime())
      return res.status(440).send(Response(errors[440].sessionExpired));
    
    res.locals.user = user;
    res.locals.refreshProfile = async () => {
      res.locals.profile = await User.findById(decoded.id, "-password");
    };
    await res.locals.refreshProfile();
  } catch (error) {
    console.error("[authMiddleware]", error);

    if (error instanceof jwt.TokenExpiredError)
      return res.status(440).send(errors[440].sessionInvalidated);

    if ("message" in error) return res.status(400).send(Response(error.message));
    return res.status(500).send(Response(errors[500]));
  }

  return next();
}
async function requireVerifiedAuth(req, res, next) {
  await requireAuth(req, res, () => { });

  if (!res.locals.user.email_verified)
    return res.status(403).send(Response(errors[403].emailUnverified));
  
  return next();
}

// check current user
async function checkUser(req, res, next) {
  // Set `user` and `profile` to null
  res.locals.user = null;
  res.locals.profile = null; 

  const token = req.cookies.jwt;

  // Skip if no token is provided
  if (!token) return next();

  try {
    const decoded = await jwtDecoded(token);

    if (decoded) {
      const user = await User.findById(decoded.id);
      if (user && decoded.last_password_reset === user._profile_information.last_password_reset.getTime()) {
        res.locals.user = user;
        res.locals.refreshProfile = async () => {
          res.locals.profile = await User.findById(decoded.id, "-password");
        };
        await res.locals.refreshProfile();
      }
    }  
  } catch (error) {
    console.error("[authMiddleware]", error);
  }

  return next();
}

module.exports = { requireAuth, requireVerifiedAuth, checkUser };
