import mongoose, { Schema } from 'mongoose';

const MatchSchema = new Schema({
  round: {
    type: Number,
  },
  teamA: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    goals: {
      type: Number,
      default: 0,
    },
  },
  teamB: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    goals: {
      type: Number,
      default: 0,
    },
  },
  fullTime: {
    type: Boolean,
    default: false,
  },
  matches: {
    type: Schema.Types.Mixed,
  },
});

export default mongoose.model('Match', MatchSchema);
