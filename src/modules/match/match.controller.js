// import mongoose from 'mongoose';
import HTTPStatus from 'http-status';

import MatchModel from './match.model';
// import TournamentModel from '../tournament/tournament.model';
import TeamModel from '../team/team.model';

export async function getMatches(req, res) {
  try {
    const matches = await MatchModel.find();
    return res.status(HTTPStatus.OK).json(matches);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function matchById(req, res) {
  try {
    const matchId = await MatchModel.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(matchId);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function matchResult(req, res) {
  try {
    const match = await MatchModel.findByIdAndUpdate(req.params.id, {
      teamA: { goals: req.body.teamAGoals },
      teamB: { goals: req.body.teamBGoals },
      fullTime: true,
    });
    return res.status(HTTPStatus.OK).json(match);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
