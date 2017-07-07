import UserRoutes from './user/user.routes';
import TournamentRoutes from './tournament/tournament.route';
import TeamRoutes from './team/team.route';

export default app => {
  app.use('/api/v1/users', UserRoutes);
  app.use('/api/v1/tournaments', TournamentRoutes);
  app.use('/api/v1/teams', TeamRoutes);
};
