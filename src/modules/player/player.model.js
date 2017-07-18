import mongoose, { Schema } from 'mongoose';

const PlayerSchema = new Schema({
  tournaments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tournament',
    },
  ],
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Player', PlayerSchema);
