module.exports = (error, data = {}, profile = undefined) => ({
	success: !error,
	error,
	...(profile ? { profile } : {}),
	data,
});
