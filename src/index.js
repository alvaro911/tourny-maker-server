/* eslint-disable no-console */

import express from 'express';

import constants from './config/constants';
import './config/db';

const app = express();

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(
      `Server listening to port ${constants.PORT}
      -----------
      Running on ${process.env.NODE_ENV}
      `);
  }
});
