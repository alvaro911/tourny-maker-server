import HTTPStatus from 'http-status';

import Team from './team.model';
import Tournament from '../tournament/tournament.model';

export async function getTeamById(req, res) {
  try {
    const teamId = await Team.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(teamId);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createTeam(req, res) {
  try {
    const team = await Team.createTeam(
      req.body,
      req.user._id,
    );
    await Tournament.findByIdAndUpdate(
      req.body.tournament,
      {
        $push: {
          teams: team,
        },
      },
    );
    return res
      .status(HTTPStatus.CREATED)
      .json(team.toJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTeamByUserId(req, res) {
  try {
    const team = await Team.find({ user: req.params.id });
    return res.status(HTTPStatus.OK).json(team);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
