import mongoose, { Schema } from 'mongoose';

import Match from '../match/match.model';

const TeamSchema = new Schema(
  {
    teamName: {
      type: String,
      trim: true,
      required: [true, 'Team name is required'],
    },
    players: [
      {
        playerName: {
          type: String,
          trim: true,
          required: [true, 'Need a player name'],
        },
        playerNumber: {
          type: Number,
          trim: true,
          required: [true, 'Need a player number'],
        },
      },
    ],
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
    },
    tournament: {
      type: Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    points: {
      type: Number,
      default: 0,
    },
    totalGoals: {
      type: Number,
      default: 0,
    },
    matchs: [{
      type: Schema.Types.ObjectId,
      ref: 'Match'
    }]
  },
  { timeStamps: true },
);

TeamSchema.methods = {
  async getTournamentTotalPoints() {
    const matches = await Match.find({ _id: { $in: this.matchs }});

    return matches.reduce((obj, m) => {
      const u = obj;
      const t = this._id === m.teamA ? 'teamA' : 'teamB';

      if (t === 'teamA') {
        u.totalPoints += m.teamAPoints
        u.totalGoals += m.goalsA;
      } else {
        u.totalPoints += m.teamBPoints
        u.totalGoals += m.goalsB;
      }

      return u;
    }, {
      totalPoints: 0,
      totalGoals: 0
    })
  },
  toJSON() {
    return {
      _id: this._id,
      teamName: this.teamName,
      players: this.players,
      points: this.points,
      totalGoals: this.totalGoals,
      tournament: this.tournament,
      user: this.user
    };
  },
};

TeamSchema.statics = {
  createTeam(args, user) {
    return this.create({
      ...args,
      user
    });
  },
};

export default mongoose.model('Team', TeamSchema);
