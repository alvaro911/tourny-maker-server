import HTTPStatus from 'http-status';

import Tournament from './tournament.model';
import User from '../user/user.model';
import MatchModel from '../match/match.model';
import TeamModel from '../team/team.model';

export async function createTournament(req, res) {
  try {
    const tournament = await Tournament.createTournament(
      req.body,
      req.user._id,
    );
    await User.findByIdAndUpdate(req.user._id, {
      $push: { tournaments: tournament },
    });
    return res.status(HTTPStatus.CREATED).json(tournament);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTournaments(req, res) {
  try {
    const tournaments = await Tournament.find()
      .populate('user')
      .populate('teams', 'teamName');
    return res.status(HTTPStatus.OK).json(tournaments);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTournamentById(req, res) {
  try {
    const tournament = await Tournament.findById(
      req.params.id,
    )
      .populate('user')
      .populate('leaderBoard');
    const teams = await TeamModel.find({
      tournament:req.params.id
    })
    const matches = await MatchModel.find({
      tournamentId: req.params.id,
    }).populate('teamA').populate('teamB').sort({round: 1});
    const pointsArr = []
    for(let i = 0; i < teams.length; i++){
      const team = await TeamModel.findById(teams[i])
      const info = await team.getTournamentTotalPoints()
      pointsArr.push(info)
    }
    pointsArr.sort((a, b) => (
      (a.points === b.points) ? b.totalGoals - a.totalGoals : b.points - a.points
    ))
    // console.log('I\'ll kill you motherfucker',pointsArr);
    return res.status(HTTPStatus.OK).json({
      ...tournament.toJSON(),
      matches,
      pointsArr
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createMatches(req, res) {
  try {
    const calendar = await Tournament.findByIdAndUpdate(
      req.params.id,
    );
    calendar.createCalendar();
    calendar.save();
    return res.status(HTTPStatus.OK).json(calendar);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateTournament(req, res) {
  try {
    const update = await Tournament.findByIdAndUpdate(
      req.params.id,
    );
    Object.keys(req.body).forEach(key => {
      update[key] = req.body[key];
    });
    return res
      .status(HTTPStatus.ACCEPTED)
      .json(update.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteTournament(req, res) {
  try {
    const tournament = await Tournament.findById(req.params.id)
    tournament.remove()
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTournamentsByUserId(req, res) {
  try {
    const tournaments = await Tournament.find({
      user: req.params.id,
    });
    return res.status(HTTPStatus.OK).json(tournaments);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTournamentByTeamId(req, res) {
  try {
    const tournament = await Tournament.find({
      teams: req.params.id,
    }).populate('teams')
    return res.status(HTTPStatus.OK).json(tournament)
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}
