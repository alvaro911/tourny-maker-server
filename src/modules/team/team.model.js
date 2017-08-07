import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema(
  {
    teamName: {
      type: String,
      trim: true,
      unique: true,
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
          unique: true,
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
    points: {
      type: Number,
      default: 0,
    },
    totalGoals: {
      type: Number,
      default: 0,
    },
  },
  { timeStamps: true },
);

TeamSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      teamName: this.teamName,
      players: this.players,
      points: this.points,
      totalGoals: this.totalGoals,
      tournament: this.tournament
    };
  },
};

TeamSchema.statics = {
  createTeam(args) {
    return this.create({
      ...args,
    });
  },
};

export default mongoose.model('Team', TeamSchema);
