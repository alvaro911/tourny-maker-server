import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
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
  position: {
    type: Number,
    default: 1,
  },
}, { timeStamps: true });

TeamSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      teamName: this.teamName,
      players: this.players,
      points: this.points,
      gameResult: this.gameResult,
    };
  },
  addPoints() {
    switch (this.gameResult) {
      case 'WIN':
        return 3;
      case 'DRAW':
        return 1;
      default:
        return 0;
    }
  },
  savePoints() {
    this.points = this.addPoints();
  },
};

TeamSchema.statics = {
  createTeam(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

export default mongoose.model('Team', TeamSchema);
