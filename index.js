const server = require('./server');
const database = require('./db');

// Boot function
(async function () {
  // Connect to mongo DB
  await database.connect();

  // Run server
  server.listen(async () => {
    console.log('Init');
  });
})();