import mongoose from 'mongoose';
import bluebird from 'bluebird';

/**
 * Connect DB
 */
let connectDB  = () => {
  mongoose.Promise = bluebird;
  let ENV = process.env;
  
  let URI = `${ENV.DB_CONN}://${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;
  
  return mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } );
}

module.exports = connectDB;
