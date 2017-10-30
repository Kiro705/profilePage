const {resolve} = require('path')
const express = require('express');
const app = express();

// static middlewear
app.use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
app.use(express.static(resolve(__dirname, '..', 'node_modules')))

//Other middlewear
if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}

app.get('*', function (req, res, next) {
  res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
});

const port = process.env.PORT || 7700;
app.listen(port, function () {
  console.log('Server is listening...');
  console.log('http://localhost:7700/');
});

//500 error middlewear
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
