// import mongoose from 'mongoose';
import HTTPStatus from 'http-status';

import MatchModel from './match.model';
// import TournamentModel from '../tournament/tournament.model';
import TeamModel from '../team/team.model';

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
    const teamA = req.body.teamA;
    const teamB = req.body.teamB;
    const goalsA = req.body.goalsA;
    const goalsB = req.body.goalsB;
    const match = await MatchModel.findByIdAndUpdate(req.params.id, {
      goalsA,
      goalsB,
      fullTime: true,
    });
    if (goalsA > goalsB) {
      await TeamModel.findByIdAndUpdate(teamA, { $inc: { points: 3 } });
    } else if (goalsA < goalsB) {
      await TeamModel.findByIdAndUpdate(teamB, { $inc: { points: 3 } });
    } else {
      await TeamModel.findByIdAndUpdate(teamA, { $inc: { points: 1 } });
      await TeamModel.findByIdAndUpdate(teamB, { $inc: { points: 1 } });
    }
    return res.status(HTTPStatus.OK).json(match);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
