import Post from './tournament.model';

export async function createTournament(req, res) {
  try {
    const post = await Post.createTournament(req.body, req.user.userName);
    return res.status(201).json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
}
