import mongoose, { Schema } from 'mongoose';

const MatchSchema = new Schema({
  round: {
    type: Number,
    required: false
  },
  teamA: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: false
  },
  goalsA: {
    type: Number,
    default: 0,
    required: false
  },
  teamB: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: false
  },
  goalsB: {
    type: Number,
    default: 0,
    required: false
  },
  fullTime: {
    type: Boolean,
    default: false,
    required: false
  },
  matches: {
    type: Schema.Types.Mixed,
    required: false
  },
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: false
  },
});

MatchSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      teamA: this.teamA,
      goalsA: this.goalsA,
      teamB: this.teamB,
      goalsB: this.goalsB,
      tournament_id: this.tournament_id,
      round: this.round,
    };
  },
};

export default mongoose.model('Match', MatchSchema);
