const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  id: Number,
  price: Number,
  stars: Number,
  reviews: Number,
  cleaningFee: Number,
  serviceFee: Number,
  guests: Number,
  minNights: Number,
  title: String,
  address: String,
  highlights: String,
  introDesc: String,
  spaceDesc: String,
  guestDesc: String,
  otherDesc: String
});

const BookingSchema = new Schema({
  id: Number,
  checkin: String,
  checkout: String,
  numGuests: Number,
  total: Number,
  listing_id: Number
});

exports.Listing = mongoose.model('listings', ListingSchema);
exports.Booking = mongoose.model('bookings', BookingSchema);