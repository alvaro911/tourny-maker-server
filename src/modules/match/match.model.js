import mongoose, { Schema } from 'mongoose';

const MatchSchema = new Schema({
  round: {
    type: Number,
  },
  teamA: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  goalsA: {
    type: Number,
    default: 0,
  },
  teamB: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  goalsB: {
    type: Number,
    default: 0,
  },
  fullTime: {
    type: Boolean,
    default: false,
  },
  matches: {
    type: Schema.Types.Mixed,
  },
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
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
