import { Router } from 'express';
import validate from 'express-validation';

import {
  authLocal,
  authJwt,
} from '../../services/auth.services';
import * as userController from './user.controller';
import userValidation from './user.validator';

const routes = Router();

routes.post(
  '/signup',
  validate(userValidation.signup),
  userController.signUp,
);
routes.post('/login', authLocal, userController.login);
routes.get('/me', authJwt, userController.getUser);
routes.patch('/me/:id', authJwt, userController.updateUser);
routes.delete(
  '/me/:id',
  authJwt,
  userController.deleteUser,
);

export default routes;
