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
    const teams = await Team.find({user: req.params.id})
    const things = teams.map(team => team._id)
    const pointsArr = []
    for(let i = 0; i < things.length; i++){
      const team = await Team.findById(things[i])
      const points = await team.getTournamentTotalPoints()
      pointsArr.push(points)
    }
    return res.status(HTTPStatus.OK).json({
      teams,
      pointsArr
    })
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}
