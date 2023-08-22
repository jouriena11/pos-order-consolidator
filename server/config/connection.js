const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://pos-mongo:27017/pos-order-consolidator');

module.exports = mongoose.connection;

