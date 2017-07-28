import mongoose, { Schema } from 'mongoose';
import robin from 'roundrobin';

import MatchModel from '../match/match.model';

const TournamentSchema = new Schema(
  {
    tournamentName: {
      type: String,
      trim: true,
      required: [true, 'Tournament name is required!'],
    },
    numberOfTeams: {
      type: Number,
      default: 0,
      trim: true,
      required: [
        true,
        'Number of tournaments participating is required1',
      ],
    },
    minimumNumPlayers: {
      type: Number,
      trim: true,
      required: [
        true,
        'A minimum amount of players has to be set',
      ],
    },
    startDate: {
      type: Date,
      trim: true,
      required: [true, 'Provide a starting date'],
    },
    state: {
      type: String,
      trim: true,
      required: [true, 'State is required'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'City is required'],
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'address is required'],
    },
    zipCode: {
      type: Number,
      trim: true,
      required: [true, 'Zip code is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    matches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Match',
      },
    ],
    leaderBoard: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
  },
  { timeStamps: true },
);

TournamentSchema.statics = {
  createTournament(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

async function createMatch(week, game, tournamentId) {
  return await MatchModel.create({
    round: week,
    teamA: game[0],
    teamB: game[1],
    tournamentId,
  });
}

TournamentSchema.methods = {
  async createCalendar(
    teams = this.teams,
    numberOfTeams = this.numberOfTeams,
  ) {
    if (teams.length === numberOfTeams) {
      robin(teams.length, teams).forEach((round, i) => {
        const week = i + 1;

        round.forEach(
          async game =>
            await createMatch(week, game, this._id),
        );
      });

      const matches = await MatchModel.find({
        tournament_id: this._id,
      });

      this.matches.push(matches);
      return await this.save();
    }
  },
};

export default mongoose.model(
  'Tournament',
  TournamentSchema,
);
