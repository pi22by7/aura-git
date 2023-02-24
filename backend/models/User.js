// Imports
const mongoose = require("mongoose");
const { isEmail, isLength } = require("validator");
const bcrypt = require("bcrypt");
const ticketConfig = require("../configs/ticket.config.json");
const meta = require("../configs/meta.json");
const errors = require("../configs/error.codes.json");
const Ticket = require("../models/Ticket");
const { chooseEmailVerificationTemplate, choosePasswordResetTemplate } = require("../utils/templates.util");
const { nodemailerCreateMail, nodemailerSendMail } = require("../utils/utils");

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
    required: [true, "Please Enter a name"],
    // validate: [isLength({min:6}),]
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
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
});

// Avoid redundant hashing
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

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
    html = await chooseEmailVerificationTemplate({
      user_name: this.name,
      redirect_uri: `${meta.host}${meta.endpoints.email_verification}?token=${token}`,
    });
  else if (purpose === ticketConfig.purposes.PASSWORD_RESET)
    html = await choosePasswordResetTemplate({
      user_name: this.name,
      dismiss_uri: `${meta.host}${meta.endpoints.password_reset}?dismiss=true&token=${token}`,
      redirect_uri: `${meta.host}${meta.endpoints.password_reset}?token=${token}`,
    });
    
  const emailObj = nodemailerCreateMail({ to: this.email, subject: purposeData.get(purpose).subject, html });
  await nodemailerSendMail(emailObj);

  return 2;
};

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
