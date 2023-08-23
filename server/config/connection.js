const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pos-order-consolidator');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pos-order-consolidator');

module.exports = mongoose.connection;

