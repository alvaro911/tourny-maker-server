import { Router } from 'express';
import validate from 'express-validation';

// import authLocal from '../../models/user/user.model';
import * as userController from './user.controller';
import userValidation from './user.validator';

const routes = Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);
routes.post('/login', userController.login);

export default routes;
