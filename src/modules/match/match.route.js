import { Router } from 'express';

import * as MatchController from './match.controller';
import { authJwt } from '../../services/auth.services';

const routes = Router();

routes.get(
  '/match/:id',
  authJwt,
  MatchController.matchById,
);

routes.patch('/:id', authJwt, MatchController.matchResult);

routes.get(
  '/tournament/:id',
  authJwt,
  MatchController.getMatchesByTournamentId,
);

export default routes;
