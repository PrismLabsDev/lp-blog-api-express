const server = require('./server');

// Boot function
(async function () {
  // Run server
  server.listen(async () => {
    console.log('Init');
  });
})();