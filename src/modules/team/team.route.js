import { Router } from 'express';

import * as TeamController from './team.controller';
import { authJwt } from '../../services/auth.services';

const routes = Router();

routes.post('/createTeam', authJwt, TeamController.createTeam);

export default routes;
