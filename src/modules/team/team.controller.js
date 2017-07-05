import HTTPStatus from 'http-status';

import Team from './team.model';
import User from '../user/user.model';

export async function createTeam(req, res) {
  try {
    const team = await Team.createTeam(req.body, req.user._id);
    await User.findByIdAndUpdate(req.user._id, { team });
    return res.status(HTTPStatus.CREATED).json(team);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
