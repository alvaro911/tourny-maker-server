import mongoose, { Schema } from 'mongoose';

const MatchSchema = new Schema ({
  teamA: {
    id: Schema.Types.ObjectId,
    goals: {
      type: Number,
      default: 0,
    },
  },
  teamB: {
    id: Schema.Types.ObjectId,
    goals: {
      type: Number,
      default: 0,
    },
  },
  fullTime: {
    type: Boolean,
    default: false,
  },
});
