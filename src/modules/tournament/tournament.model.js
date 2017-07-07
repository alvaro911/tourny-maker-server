import mongoose, { Schema } from 'mongoose';
import robin from 'roundrobin';

const TournamentSchema = new Schema({
  tournamentName: {
    type: String,
    trim: true,
    required: [true, 'Tournament name is required!'],
  },
  numberOfTeams: {
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
  // TODO: change this to be a date type
  tournamentStarts: {
    type: String,
    trim: true,
    required: [true, 'Provide a starting date'],
  },
  // TODO: change this to be a date type©
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
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  matches: [
    {
      type: Object,
    },
  ],
}, { timeStamps: true });

TournamentSchema.statics = {
  createTournament(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

TournamentSchema.methods = {
  createCalendar(teams = this.teams, numberOfTeams = this.numberOfTeams) {
    if (teams.length === numberOfTeams) {
      console.log('============================== ', typeof (robin(teams.length, teams)));
      this.matches = robin(teams.length, teams);
    }
  },
};

export default mongoose.model('Tournament', TournamentSchema);
