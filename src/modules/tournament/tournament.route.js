import { Router } from 'express';
import validate from 'express-validation';

import * as tournamentController from './tournament.controller';
import {
  authJwt,
  creatorIsRequired,
} from '../../services/auth.services';
import tournamentValidation from './tournament.validator';

const routes = Router();

routes.post(
  '/createTournament',
  authJwt,
  creatorIsRequired,
  validate(tournamentValidation.createTournament),
  tournamentController.createTournament,
);

routes.post(
  '/:id',
  authJwt,
  creatorIsRequired,
  tournamentController.createMatches,
);

routes.get(
  '/',
  authJwt,
  tournamentController.getTournaments,
);

routes.get(
  '/:id',
  authJwt,
  tournamentController.getTournamentById,
);

routes.get(
  '/tournamentId/:id',
  authJwt,
  creatorIsRequired,
  tournamentController.getTournamentsByUserId,
);

routes.patch(
  '/:id',
  authJwt,
  creatorIsRequired,
  tournamentController.updateTournament,
);

routes.delete(
  '/:id',
  authJwt,
  creatorIsRequired,
  tournamentController.deleteTournament,
);

routes.get(
  '/team/:id',
  authJwt,
  tournamentController.getTournamentByTeamId,
);

export default routes;
