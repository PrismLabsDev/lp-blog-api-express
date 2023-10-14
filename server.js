const express = require('express');
const address = require('address');
const dotenv = require('dotenv');

dotenv.config();

// Global middleware
const bodyParser = require('body-parser');

// Routes
const routesWeb = require('./routes/web');
const routesAPI = require('./routes/api');

const port = process.env.PORT;
const app = express();

// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routesWeb);
app.use('/api', routesAPI);

const listen = async (setup) => {
  await setup();
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
    console.log(`Available on your local computer at http://localhost:${port}`);
		console.log(`Available on your local network at http://${address.ip()}:${port}`);
	});
};

module.exports = {
	app,
	listen,
};