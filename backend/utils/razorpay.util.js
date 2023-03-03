/**
 * Not in use
 */

// Imports
const assert = require("assert");
const razorpay = require("razorpay");
const { razorpay: rpConfig } = require("../configs/utils.config.json");

// Constants
const { RAZORPAY_KEY_ID: KEY_ID, RAZORPAY_KEY_SECRET: KEY_SECRET } = process.env;
const rp = new razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });

// Body
async function _rpCreateOrder(amount, currency = rpConfig.currency) {
	assert(typeof amount === "number");
	assert(amount >= 0);

	return rp.orders.create({ amount, currency });
}

async function rpCreateOrderByScheme(scheme) {
	if (!(scheme in rpConfig.schemes)) return null;

	return _rpCreateOrder(rpConfig.schemes[scheme].amount);
}

async function rpFetchOrderById(id) {
	return new Promise((resolve, _) => {
		rp.orders.fetch(id)
			.then(resolve)
			.catch(_ => resolve(null));
	});
}

module.exports = {
	_rpCreateOrder,
	rpCreateOrderByScheme,
	rpFetchOrderById,
};
