import { Router } from 'express';

import * as MatchController from './match.controller';
import { authJwt } from '../../services/auth.services'

const routes = Router();

routes.get('/:id', MatchController.matchById);

routes.patch('/:id', MatchController.matchResult);

routes.get('/tournament/:id', authJwt, MatchController.getMatchesByTournamentId)

export default routes;
