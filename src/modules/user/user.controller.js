import HTTPStatus from 'http-status';

import User from './user.model';

export async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    return res
      .status(HTTPStatus.CREATED)
      .json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  return next();
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    return res
      .status(HTTPStatus.CREATED)
      .json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateUser(req, res) {
  try {
    const userUpdate = await User.findById(req.user._id);
    Object.keys(req.body).forEach(key => {
      userUpdate[key] = req.body[key];
    });
    return res
      .status(HTTPStatus.OK)
      .json(await userUpdate.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
