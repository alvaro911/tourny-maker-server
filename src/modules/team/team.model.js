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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  gameResult: {
    type: String,
    enum: ['WIN', 'DRAW', 'LOSS'],
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
