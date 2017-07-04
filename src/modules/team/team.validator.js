import Joi from 'joi';

export default {
  createTeam: {
    body: {
      teamName: Joi.string().required(),
      // TODO: enter items in the array
      players: Joi.array().required(),
    },
  },
};
