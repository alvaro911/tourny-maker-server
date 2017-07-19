import { Router } from 'express';

import * as MatchController from './match.controller';

const routes = Router();

routes.get('/', MatchController.getMatches);

routes.get('/:id', MatchController.matchById);

export default routes;
