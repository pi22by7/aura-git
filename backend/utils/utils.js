// Imports
const nodemailer = require("nodemailer");
const randexp = require("randexp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// - `nodemailer`
const { NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: NODEMAILER_EMAIL,
		pass: NODEMAILER_PASS,
	}
});

const nodemailerCreateMail = ({ from = NODEMAILER_EMAIL, to, subject, text = undefined, html = undefined }) => ({
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
const BCRYPT_SALTROUNDS = 10;

async function bcryptHash(s) {
    return bcrypt.hash(s, BCRYPT_SALTROUNDS);
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

