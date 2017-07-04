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
});

TeamSchema.statics = {
  createTeam(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

export default mongoose.model('Team', TeamSchema);
