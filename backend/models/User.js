// Imports
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { jwt: jwtConfig } = require("../configs/utils.config.json");
const ticketConfig = require("../configs/ticket.config.json");
const meta = require("../configs/meta.json");
const errors = require("../configs/error.codes.json");
const Ticket = require("../models/Ticket");
const { chooseEmailVerificationDarkTemplate, choosePasswordResetDarkTemplate } = require("../utils/templates.util");
const { nodemailerCreateMail, nodemailerSendMail, jwtCreate, bcryptCompare } = require("../utils/utils");

// Constants
const purposeData = new Map([
  [ticketConfig.purposes.EMAIL_VERIFICATION, {
    // field: "email_verification",
    subject: "Email verification required",
  }],
  [ticketConfig.purposes.PASSWORD_RESET, {
    // field: "password_reset",
    subject: "Reset your account password",
  }],
]);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errors[400].nameRequired],
  },
  email: {
    type: String,
    required: [true, errors[400].emailRequired],
    unique: true,
    lowercase: true,
    validate: [isEmail, errors[400].invalidEmail],
  },
  usn: {
    type: String,
    required: [true, errors[400].usnRequired],
    trim: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, errors[400].passwordRequired],
    minlength: [6, errors[400].shortPassword],
  },
  tickets: {
    email_verification: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    password_reset: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  _profile_information: {
    last_password_reset: {
      type: Date,
      default: Date.now,
    },
  },
});

// Avoid redundant hashing
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Methods
userSchema.methods.createNewTicket = async function (purpose, data = null) {
  // Validate purpose
  if (!Object.values(ticketConfig.purposes).includes(purpose))
    throw Error(errors[500]);
  
  // Check if email is already verified (in case of email verification)
  if (purpose === ticketConfig.purposes.EMAIL_VERIFICATION && this.email_verified)
    return 0;

  // Check if a ticket is already open
  const ticketId = this.tickets[ticketConfig.user_tickets_fields[purpose]];
  if (ticketId && await Ticket.findById(ticketId))
    return 1;
    
  // Create ticket
  const ticket = await Ticket.create({
    user_id: this._id,
    purpose,
    data,
  });
  this.tickets[ticketConfig.user_tickets_fields[purpose]] = ticket._id;
  await this.save();

  // Create token
  const token = ticket.getReferenceToken();

  // Create email
  let html = null;
  if (purpose === ticketConfig.purposes.EMAIL_VERIFICATION)
    html = await chooseEmailVerificationDarkTemplate({
      user_name: this.name,
      redirect_uri: `${meta.host}${meta.endpoints.email_verification}?token=${token}`,
    });
  else if (purpose === ticketConfig.purposes.PASSWORD_RESET)
    html = await choosePasswordResetDarkTemplate({
      user_name: this.name,
      dismiss_uri: `${meta.host}${meta.endpoints.password_reset}?dismiss=true&token=${token}`,
      redirect_uri: `${meta.host}${meta.endpoints.password_reset}?token=${token}`,
    });
    
  const emailObj = nodemailerCreateMail({ to: this.email, subject: purposeData.get(purpose).subject, html });
  await nodemailerSendMail(emailObj);

  return 2;
};

userSchema.methods.createToken = function () {
  return jwtCreate({
    id: this._id,
    last_password_reset: this._profile_information.last_password_reset.getTime(),
  }, jwtConfig.ages.login);
};

// static method to login user
userSchema.statics.login = async function (email, password) {
  if (!isEmail(email))
    throw Error(errors[400].invalidEmail);

  // Check if user exists
  const user = await this.findOne({ email });
  if (!user)
    throw Error(errors[404].userNotFound);

  // Validate password
  if (!(await bcryptCompare(user.password, password)))
    throw Error(errors[403].passwordMismatch);
  
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
