// Imports
const winston = require("winston");
require("winston-daily-rotate-file");

// Constants
const errorTransport = new winston.transports.DailyRotateFile({
	level: "error",
	filename: "errors-%DATE%.log",
	dirname: "error_logs",
	datePattern: "YYYY-MM-DD-HH",
	zippedArchive: true,
	maxSize: "5m",
	maxFiles: "1d",
});
const infoTransport = new winston.transports.DailyRotateFile({
	level: "info",
	filename: "infos-%DATE%.log",
	dirname: "info_logs",
	datePattern: "YYYY-MM-DD-HH",
	zippedArchive: true,
	maxSize: "5m",
	maxFiles: "1d",
});

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.errors({ stack: true }),
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
		winston.format.printf(({ timestamp, level, message, stack }) => {
			const text = `${timestamp} ${level.toUpperCase()} ${message}`;
			return stack ? text + "\n" + stack : text;
		}),
	),
	transports: [
		errorTransport,
		infoTransport,
	],
});

module.exports = {
	logInfo: logger.info,
	logError: logger.error,
};
