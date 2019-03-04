const
  redis = require('redis'),
  mongoose = require('mongoose'),
  Router = require('express').Router(),
  { Listing, Booking } = require('../db/mongo/Schema.js');

let 
  client = redis.createClient('redis://localhost:6379');
  
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, poolSize: 10 })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(() => {
    console.log('mongodb failed');
  });

module.exports = Router
  .get('/rooms/checkout/:listingId', (req, res) => {

    client.get(req.params.listingId, function(err, result) {
      if (result) {
        console.log('fetched from cached', result);
        res.send(JSON.parse(result));
        return
      }
      Listing
        .find({ id: req.params.listingId})
        .then((records) => {
          // console.log('server get listings: ', records);
          client.set(req.params.listingId, JSON.stringify(records), 'EX', 60);
          res.status(200).send(records);
        });
    });

    // Listing
    //   .find({ id: req.params.listingId})
    //   .then((records) => {
    //     // console.log('server get listings: ', records);
    //     res.send(records);
    //   });

  })
  .post('/rooms/checkout/:listingId', (req, res) => {
    const newBooking = new Booking(
      {
        checkin: req.body.checkIn, 
        checkout: req.body.checkOut, 
        numGuests: req.body.numGuests, 
        total: req.body.total, 
        listing_id: req.params.listingId,
      }
    )
    newBooking.save();
    res.status(200);
  })
  .patch('/rooms/checkout/:listingId', (req, res) => {
    Booking
      .findOne({ listing_id: req.params.listingId })
      .then((records) => {
        if (records) {
          Booking.findOneAndUpdate({ listing_id: req.params.listingId }, {
            checkin: req.body.checkIn, 
            checkout: req.body.checkOut, 
            numGuests: req.body.numGuests, 
            total: req.body.total, 
            listing_id: req.params.listingId,
          }, { new: true });
        }
      })
      .catch((err) => {
        console.log('failed to patch record id of', req.params.listingId);
      })
    
  })
  .delete('/rooms/checkout/:listingId', (req, res) => {
    Listing
      .find({ id: req.params.listingId })
      .then((records) => {
        if (!records) {
          Listing.deleteOne({ id: req.params.listingId })
        }
      });
  })
  .get('/rooms/bookings/:listingId', (req, res) => {
    Booking
      .find({ listing_id: req.params.listingId })
      .then((records) => {
        res.send(records);
      })
      .catch((err) => {
        console.log('failed to get booking with id of ', req.params.listingId);
      });
  })
  .delete('/rooms/bookings/:listingId', (req, res) => {
    Booking
      .find({ listing_id: req.params.listingId })
      .then((records) => {
        if (!records) {
          Booking.deleteOne({ listing_id: req.params.listingId })
        }
      })
      .catch((err) => {
        console.log('failed to delete booking with id of ', req.params.listingId);
      });
  });