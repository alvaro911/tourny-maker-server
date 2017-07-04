import { Router } from 'express';

import * as tournamentController from './tournament.controller';
import { authJwt } from '../../services/auth.services';

const routes = Router();

routes.post('/createTournament', authJwt, tournamentController.createTournament);

export default routes;
