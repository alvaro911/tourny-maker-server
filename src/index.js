/* eslint-disable no-console */

import express from 'express';

import constants from './config/constants';
import './config/db';
import middleWareConfigs from './config/middlewares';
import apiRoutes from './models';

const app = express();
middleWareConfigs(app);

app.get('/', (req, res) => {
  res.send('Hello nurse!');
});

apiRoutes(app);

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
