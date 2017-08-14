import { Router } from 'express';
import validate from 'express-validation';

import * as TeamController from './team.controller';
import { authJwt } from '../../services/auth.services';
import teamValidator from './team.validator';

const routes = Router();

routes.get('/:id', authJwt, TeamController.getTeamById);

routes.get(
  '/user/:id',
  authJwt,
  TeamController.getTeamByUserId,
);

routes.post(
  '/createTeam',
  authJwt,
  validate(teamValidator.createTeam),
  TeamController.createTeam,
);

export default routes;
