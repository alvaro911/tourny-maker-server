import UserRoutes from './user/user.routes';

export default app => {
  app.use('/api/v1/users', UserRoutes);
};
