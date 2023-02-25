// Imports
const nodemailer = require("nodemailer");
const randexp = require("randexp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const meta = require("../configs/meta.json");
const { bcrypt: bcryptConfig } = require("../configs/utils.config.json");

// - `nodemailer`
const { NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: NODEMAILER_EMAIL,
		pass: NODEMAILER_PASS,
	}
});

const nodemailerCreateMail = ({ from = meta.name, to, subject, text = undefined, html = undefined }) => ({
	from,
	to,
	subject,
	...(text ? { text } : { html }),
});
const nodemailerSendMail = async (mail) => transporter.sendMail(mail);
//

// - `randexp`
const otpRandExp = new randexp(/^\d{6}$/);

const randexpGenerateOtp = otpRandExp.gen;
//

// - `jwt`
const { JWT_SECRET } = process.env;

const jwtCreate = function (obj, expires = undefined) {
	return jwt.sign(obj, JWT_SECRET, expires ? {
		expiresIn: expires,
	} : undefined);
};
const jwtDecoded = async function (token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) reject(err);
			return resolve(decoded);
		});
	});
};
//

// `bcrypt`
async function bcryptHash(s) {
    return bcrypt.hash(s, bcryptConfig["salt.rounds"]);
}
async function bcryptCompare(hash, s) {
    return bcrypt.compare(s, hash);
}
//

module.exports = {
	nodemailerCreateMail,
	nodemailerSendMail,
	randexpGenerateOtp,
	jwtCreate,
	jwtDecoded,
	bcryptHash,
	bcryptCompare,
};

