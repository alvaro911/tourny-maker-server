import HTTPStatus from 'http-status';

import Tournament from './tournament.model';
import User from '../user/user.model';
import '../team/team.model';

export async function createTournament(req, res) {
  try {
    const tournament = await Tournament.createTournament(req.body, req.user._id);
    await User.findByIdAndUpdate(req.user._id, { $push: { tournaments: tournament } });
    return res.status(HTTPStatus.CREATED).json(tournament);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTournaments(req, res) {
  try {
    const tournaments = await Tournament.find().populate('user').populate('teams', 'teamName');
    return res.status(HTTPStatus.OK).json(tournaments);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getTournamentById(req, res) {
  try {
    const tournament = await Tournament.findById(req.params.id).populate('user').populate('teams');
    return res.status(HTTPStatus.OK).json(tournament);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getCalendar(req, res) {
  try {
    const calendar = await Tournament.findById(req.params.id);
    calendar.createCalendar();
    calendar.save();
    return res.status(HTTPStatus.OK).json(calendar);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
