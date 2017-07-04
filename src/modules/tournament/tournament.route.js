import { Router } from 'express';
import validate from 'express-validation';

import * as tournamentController from './tournament.controller';
import { authJwt } from '../../services/auth.services';
import tournamentValidation from './tournament.validator';

const routes = Router();

routes.post(
  '/createTournament',
  authJwt,
  validate(tournamentValidation.createTournament),
  tournamentController.createTournament
);

export default routes;
