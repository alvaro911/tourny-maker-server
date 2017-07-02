/* eslint-disable no-console */

import mongoose from 'mongoose';

import constants from './constants';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB running'))
  .on('error', e => {
    throw e;
  });  
