const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const address = require('address');
const dotenv = require('dotenv');

dotenv.config();

// Routes
const routesWeb = require('./routes/web');
const routesAPI = require('./routes/api');

const port = process.env.PORT;
const app = express();

// Cors
app.use(cors({
  origin: true,
}))

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