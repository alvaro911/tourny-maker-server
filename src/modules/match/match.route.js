import { Router } from 'express';

import * as MatchController from './match.controller';

const routes = Router();

routes.get('/:id', MatchController.matchById);

routes.post('/:id', MatchController.matchResult);

export default routes;
