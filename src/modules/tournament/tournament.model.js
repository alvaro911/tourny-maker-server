import mongoose, { Schema } from 'mongoose';

const TournamentSchema = new Schema({
  tournamentName: {
    type: String,
    trim: true,
    required: [true, 'Tournament name is required!'],
  },
  numberOftournaments: {
    type: Number,
    default: 0,
    trim: true,
    required: [true, 'Number of tournaments participating is required1'],
  },
  minimumNumPlayers: {
    type: Number,
    trim: true,
    required: [true, 'A minimum amount of players has to be set'],
  },
  tournamentStarts: {
    type: String,
    trim: true,
    required: [true, 'Provide a starting date'],
  },
  willBePlayed: {
    type: String,
    trim: true,
    required: [true, 'How often will tournaments play?'],
  },
  state: {
    type: String,
    trim: true,
    required: [true, 'State is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'address is required'],
  },
  zipCode: {
    type: Number,
    trim: true,
    required: [true, 'Zip code is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timeStamp: true });

TournamentSchema.statics = {
  createTournament(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

export default mongoose.model('Tournament', TournamentSchema);
