import { Router } from 'express';
import validate from 'express-validation';

import { authLocal, creatorJwt } from '../../services/auth.services';
import * as userController from './user.controller';
import userValidation from './user.validator';

const routes = Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);
routes.post('/login', authLocal, userController.login);
routes.get('/me', creatorJwt, userController.getUser);

export default routes;
