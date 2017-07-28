import Joi from 'joi';

export default {
  createTournament: {
    body: {
      tournamentName: Joi.string().required(),
      numberOfTeams: Joi.number()
        .integer()
        .positive()
        .required(),
      minimumNumPlayers: Joi.number()
        .integer()
        .positive()
        .required(),
      // TODO: change this to be a date type
      startDate: Joi.string().required(),
      state: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      zipCode: Joi.number().integer().positive().required(),
    },
  },
};
