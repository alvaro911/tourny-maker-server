import { Router } from 'express';
import validate from 'express-validation';

import * as TeamController from './team.controller';
import { creatorJwt } from '../../services/auth.services';
import teamValidator from './team.validator';

const routes = Router();

routes.get('/:id', TeamController.getTeamById);

routes.post(
  '/createTeam',
  creatorJwt,
  validate(teamValidator.createTeam),
  TeamController.createTeam,
);

export default routes;
