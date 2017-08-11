import HTTPStatus from 'http-status';

import MatchModel from './match.model';
import TeamModel from '../team/team.model';

export async function matchById(req, res) {
  try {
    const matchId = await MatchModel.findById(req.params.id)
      .populate('teamA')
      .populate('teamB');
    return res.status(HTTPStatus.OK).json(matchId);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function matchResult(req, res) {
  try {
    // const { teamA, teamB } = req.body;
    const goalsA = Number(req.body.goalsA);
    const goalsB = Number(req.body.goalsB);
    const match = await MatchModel.findById(req.params.id);
    // Find both team and make a variables with it
    const teamA = await TeamModel.findById(match.teamA);
    const teamB = await TeamModel.findById(match.teamB);

    match.teamAPoints = 0;
    match.teamBPoints = 0;
    match.goalsA = 0;
    match.goalsB = 0;

    if (goalsA > goalsB) {
      // If teamA more points increment 3 points
      match.teamAPoints += 3;
    } else if (goalsA < goalsB) {
      // If teamB more points increment 3 points
      match.teamBPoints += 3;
    } else {
      // If match null both get 1 point
      match.teamAPoints += 1;
      match.teamBPoints += 1;
    }

    match.fullTime = true;
    match.goalsA = goalsA;
    match.goalsB = goalsB;

    // Wait both save promise before continue
    await match.save();

    const pointTeamA = await teamA.getTournamentTotalPoints();
    const pointTeamB = await teamB.getTournamentTotalPoints();

    return res.status(HTTPStatus.OK).json({
      match,
      teamA: pointTeamA,
      teamB: pointTeamB
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getMatchesByTournamentId(req, res) {
  try {
    const matches = await MatchModel.find({ tournamentId: req.params.id })
      .sort({ round: 1 })
      .populate('teamA')
      .populate('teamB');
    return res.status(HTTPStatus.OK).json(matches);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
