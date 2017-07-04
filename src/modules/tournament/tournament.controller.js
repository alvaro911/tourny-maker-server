import Tournament from './tournament.model';

export async function createTournament(req, res) {
  try {
    const post = await Tournament.createTournament(req.body, req.user._id);
    return res.status(201).json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
}
