const mongoose = require('mongoose');

const createConnection = async () => {
	return await mongoose.createConnection(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`);
};

const connect = async () => {
	await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`);
};

const close = async () => {
	await mongoose.disconnect();
};

module.exports = {
  createConnection,
  connect,
  close
};