
const 
  app = require('express')(),
  routes = require('./routes'),
  queue = require('express-queue'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  rateLimit = require("express-rate-limit"),
  staticRoute = require('express').static(__dirname + '/../public');

module.exports = function() {

  let limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  app
    // .use(limiter)
    // .use(queue({ activeLimit: 3000, queuedLimit: -1 }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/', routes)
    .use('/', staticRoute)
    .use('/rooms/:listingId', staticRoute)
    .use(compress());

  let port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log(`listening on port ${port}:${process.pid}`);
  });

}
