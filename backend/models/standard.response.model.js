module.exports = (error, data = {}) => ({
	success: !error,
	error,
	data,
});
