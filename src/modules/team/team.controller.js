import Team from './team.model';

export async function createTeam(req, res) {
  try {
    const team = await Team.createTeam(req.body, req.user._id);
    return res.status(201).json(team);
  } catch (e) {
    return res.status(400).json(e);
  }
}
