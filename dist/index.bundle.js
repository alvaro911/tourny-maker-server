module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _match = __webpack_require__(4);

var _match2 = _interopRequireDefault(_match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TeamSchema = new _mongoose.Schema({
  teamName: {
    type: String,
    trim: true,
    required: [true, 'Team name is required']
  },
  players: [{
    playerName: {
      type: String,
      trim: true,
      required: [true, 'Need a player name']
    },
    playerNumber: {
      type: Number,
      trim: true,
      required: [true, 'Need a player number']
    }
  }],
  player: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  tournament: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  matchs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }]
}, { timeStamps: true });

TeamSchema.methods = {
  async getTournamentTotalPoints() {
    const matches = await _match2.default.find({ _id: { $in: this.matchs } });
    return matches.reduce((obj, m) => {
      const u = obj;
      const t = this._id.equals(m.teamA) ? 'teamA' : 'teamB';

      if (t === 'teamA') {
        u.totalPoints += m.teamAPoints;
        u.totalGoals += m.goalsA;
      } else {
        u.totalPoints += m.teamBPoints;
        u.totalGoals += m.goalsB;
      }

      return u;
    }, {
      teamId: this._id,
      teamName: this.teamName,
      totalPoints: 0,
      totalGoals: 0
    });
  },
  toJSON() {
    return {
      _id: this._id,
      teamName: this.teamName,
      players: this.players,
      points: this.points,
      totalGoals: this.totalGoals,
      tournament: this.tournament,
      user: this.user,
      matchs: this.matchs
    };
  }
};

TeamSchema.statics = {
  createTeam(args, user) {
    return this.create(Object.assign({}, args, {
      user
    }));
  }
};

exports.default = _mongoose2.default.model('Team', TeamSchema);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/tourny-maker-dev',
  JWT_SECRET: 'aSecretKey'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/tourny-maker-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://alvaro911:Password1@ds141118.mlab.com:41118/tournaments',
  JWT_SECRET: 'iWannaRock'
};

const defaultConfig = {
  PORT: process.env.PORT || 8080
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MatchSchema = new _mongoose.Schema({
  round: {
    type: Number,
    required: false
  },
  teamA: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  goalsA: {
    type: Number,
    default: 0,
    required: false
  },
  teamB: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  teamAPoints: {
    type: Number,
    default: 0
  },
  teamBPoints: {
    type: Number,
    default: 0
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
    type: _mongoose.Schema.Types.Mixed,
    required: false
  },
  tournamentId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: false
  }
});

MatchSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      teamA: this.teamA,
      goalsA: this.goalsA,
      teamB: this.teamB,
      goalsB: this.goalsB,
      tournamentId: this.tournamentId,
      round: this.round,
      fullTime: this.fullTime,
      teamAPoints: this.teamAPoints,
      teamBPoints: this.teamBPoints
    };
  }
};

exports.default = _mongoose2.default.model('Match', MatchSchema);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;
exports.creatorIsRequired = creatorIsRequired;

var _passport = __webpack_require__(12);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(35);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(34);

var _user = __webpack_require__(8);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOptions = {
  usernameField: 'email'
};

const localStg = new _passportLocal2.default(localOptions, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.authUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

const jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader('Authorization'),
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await _user2.default.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// const creatorStrategy = new JWTStrategy(
//   jwtOptions,
//   async (payload, done) => {
//     try {
//       const user = await User.findById(payload._id);
//
//       if (!user || user.role !== 'CREATOR') {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     } catch (e) {
//       return done(e, false);
//     }
//   },
// );

_passport2.default.use(localStg);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', {
  session: false
});
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', {
  session: false
});
// export const creatorJwt = passport.authenticate('jwt', {
//   session: false,
// });

function creatorIsRequired(req, res, next) {
  if (!req.user || req.user.role !== 'CREATOR') {
    throw new Error('Unauthorized');
  }

  return next();
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _roundrobin = __webpack_require__(36);

var _roundrobin2 = _interopRequireDefault(_roundrobin);

var _match = __webpack_require__(4);

var _match2 = _interopRequireDefault(_match);

var _team = __webpack_require__(1);

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TournamentSchema = new _mongoose.Schema({
  tournamentName: {
    type: String,
    trim: true,
    required: [true, 'Tournament name is required!']
  },
  numberOfTeams: {
    type: Number,
    default: 0,
    trim: true,
    required: [true, 'Number of tournaments participating is required1']
  },
  minimumNumPlayers: {
    type: Number,
    trim: true,
    required: [true, 'A minimum amount of players has to be set']
  },
  startDate: {
    type: Date,
    trim: true,
    required: [true, 'Provide a starting date']
  },
  state: {
    type: String,
    trim: true,
    required: [true, 'State is required']
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City is required']
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'address is required']
  },
  zipCode: {
    type: Number,
    trim: true,
    required: [true, 'Zip code is required']
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  teams: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  matches: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }],
  leaderBoard: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }]
}, { timeStamps: true });

TournamentSchema.statics = {
  createTournament(args, user) {
    return this.create(Object.assign({}, args, {
      user
    }));
  }
};

TournamentSchema.pre('remove', async function (next) {
  await _team2.default.remove({ tournament: this._id });
  return next();
});

async function createMatch(week, game, tournamentId) {
  const m = await _match2.default.create({
    round: week,
    teamA: game[0],
    teamB: game[1],
    tournamentId
  });

  const teamA = await _team2.default.findById(game[0]);
  const teamB = await _team2.default.findById(game[1]);

  teamA.matchs.push(m);
  teamB.matchs.push(m);

  await Promise.all([teamA.save(), teamB.save()]);

  return m;
}

TournamentSchema.methods = {
  async createCalendar(teams = this.teams, numberOfTeams = this.numberOfTeams) {
    if (teams.length === numberOfTeams) {
      (0, _roundrobin2.default)(teams.length, teams).forEach((round, i) => {
        const week = i + 1;

        round.forEach(async game => await createMatch(week, game, this._id, { $push: { matches: game } }));
      });

      const matches = await _match2.default.find({
        tournament_id: this._id
      });

      this.matches.push(matches);
      return await this.save();
    }
  }
};

exports.default = _mongoose2.default.model('Tournament', TournamentSchema);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(37);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(27);

var _jsonwebtoken = __webpack_require__(32);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(11);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

var _tournament = __webpack_require__(7);

var _tournament2 = _interopRequireDefault(_tournament);

var _team = __webpack_require__(1);

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: ['true', 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  userName: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [6, 'Password needs to be longer'],
    validate: {
      validator(password) {
        return _user.passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password'
    }
  },
  role: {
    type: String,
    default: 'CREATOR',
    enum: ['PLAYER', 'CREATOR', 'ADMIN'],
    required: [true, 'user role is required']
  }
}, { timeStamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.pre('remove', async function (next) {
  await _tournament2.default.remove({ user: this._id });
  await _team2.default.remove({ user: this._id });
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({
      _id: this._id
    }, _constants2.default.JWT_SECRET);
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      email: this.email
    };
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(10);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

exports.default = {
  signup: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().regex(passwordReg).required(),
      firstName: _joi2.default.string().required(),
      lastName: _joi2.default.string().required(),
      userName: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB running')).on('error', e => {
  throw e;
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(33);

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = __webpack_require__(31);

var _helmet2 = _interopRequireDefault(_helmet);

var _bodyParser = __webpack_require__(28);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(29);

var _compression2 = _interopRequireDefault(_compression);

var _passport = __webpack_require__(12);

var _passport2 = _interopRequireDefault(_passport);

var _cors = __webpack_require__(30);

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use((0, _cors2.default)('*'));
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(26);

var _user2 = _interopRequireDefault(_user);

var _tournament = __webpack_require__(23);

var _tournament2 = _interopRequireDefault(_tournament);

var _team = __webpack_require__(20);

var _team2 = _interopRequireDefault(_team);

var _match = __webpack_require__(18);

var _match2 = _interopRequireDefault(_match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/tournaments', _tournament2.default);
  app.use('/api/v1/teams', _team2.default);
  app.use('/api/v1/matches', _match2.default);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(13);

var _middlewares = __webpack_require__(14);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(15);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable no-console */

(0, _middlewares2.default)(app);

app.get('/', (req, res) => {
  res.send('Hello nurse!');
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server listening to port ${_constants2.default.PORT}
      -----------
      Running on ${process.env.NODE_ENV}
      `);
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchById = matchById;
exports.matchResult = matchResult;
exports.getMatchesByTournamentId = getMatchesByTournamentId;

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _match = __webpack_require__(4);

var _match2 = _interopRequireDefault(_match);

var _team = __webpack_require__(1);

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function matchById(req, res) {
  try {
    const matchId = await _match2.default.findById(req.params.id).populate('teamA').populate('teamB');
    return res.status(_httpStatus2.default.OK).json(matchId);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function matchResult(req, res) {
  try {
    const goalsA = Number(req.body.goalsA);
    const goalsB = Number(req.body.goalsB);
    const match = await _match2.default.findById(req.params.id);
    // Find both team and make a variables with it
    const teamA = await _team2.default.findById(match.teamA);
    const teamB = await _team2.default.findById(match.teamB);

    match.teamAPoints = 0;
    match.teamBPoints = 0;
    match.goalsA = 0;
    match.goalsB = 0;

    if (goalsA > goalsB) {
      // If teamA more goals increment 3 points
      match.teamAPoints += 3;
    } else if (goalsA < goalsB) {
      // If teamB more goals increment 3 points
      match.teamBPoints += 3;
    } else {
      // If match null both get 1 point
      match.teamAPoints += 1;
      match.teamBPoints += 1;
    }

    match.fullTime = true;
    match.goalsA = goalsA;
    match.goalsB = goalsB;

    // Wait both save promise before continue
    await match.save();

    const pointTeamA = await teamA.getTournamentTotalPoints();
    const pointTeamB = await teamB.getTournamentTotalPoints();

    return res.status(_httpStatus2.default.OK).json({
      match,
      teamA: pointTeamA,
      teamB: pointTeamB
    });
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getMatchesByTournamentId(req, res) {
  try {
    const matches = await _match2.default.find({ tournamentId: req.params.id }).sort({ round: 1 }).populate('teamA').populate('teamB');
    return res.status(_httpStatus2.default.OK).json(matches);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _match = __webpack_require__(17);

var MatchController = _interopRequireWildcard(_match);

var _auth = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = (0, _express.Router)();

routes.get('/match/:id', _auth.authJwt, MatchController.matchById);

routes.patch('/:id', _auth.authJwt, MatchController.matchResult);

routes.get('/tournament/:id', _auth.authJwt, MatchController.getMatchesByTournamentId);

exports.default = routes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTeamById = getTeamById;
exports.createTeam = createTeam;
exports.getTeamByUserId = getTeamByUserId;

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _team = __webpack_require__(1);

var _team2 = _interopRequireDefault(_team);

var _tournament = __webpack_require__(7);

var _tournament2 = _interopRequireDefault(_tournament);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getTeamById(req, res) {
  try {
    const teamId = await _team2.default.findById(req.params.id);
    return res.status(_httpStatus2.default.OK).json(teamId);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function createTeam(req, res) {
  try {
    const team = await _team2.default.createTeam(req.body, req.user._id);
    await _tournament2.default.findByIdAndUpdate(req.body.tournament, {
      $push: {
        teams: team,
        leaderBoard: team
      }
    });
    return res.status(_httpStatus2.default.CREATED).json(team.toJSON());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getTeamByUserId(req, res) {
  try {
    const team = await _team2.default.find({ user: req.params.id });
    return res.status(_httpStatus2.default.OK).json(team);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(9);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _team = __webpack_require__(19);

var TeamController = _interopRequireWildcard(_team);

var _auth = __webpack_require__(5);

var _team2 = __webpack_require__(21);

var _team3 = _interopRequireDefault(_team2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.get('/:id', _auth.authJwt, TeamController.getTeamById);

routes.get('/user/:id', _auth.authJwt, TeamController.getTeamByUserId);

routes.post('/createTeam', _auth.authJwt, (0, _expressValidation2.default)(_team3.default.createTeam), TeamController.createTeam);

exports.default = routes;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(10);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createTeam: {
    body: {
      teamName: _joi2.default.string().required(),
      // TODO: enter items in the array
      players: _joi2.default.array().required()
    }
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTournament = createTournament;
exports.getTournaments = getTournaments;
exports.getTournamentById = getTournamentById;
exports.createMatches = createMatches;
exports.updateTournament = updateTournament;
exports.deleteTournament = deleteTournament;
exports.getTournamentsByUserId = getTournamentsByUserId;
exports.getTournamentByTeamId = getTournamentByTeamId;

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _tournament = __webpack_require__(7);

var _tournament2 = _interopRequireDefault(_tournament);

var _user = __webpack_require__(8);

var _user2 = _interopRequireDefault(_user);

var _match = __webpack_require__(4);

var _match2 = _interopRequireDefault(_match);

var _team = __webpack_require__(1);

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createTournament(req, res) {
  try {
    const tournament = await _tournament2.default.createTournament(req.body, req.user._id);
    await _user2.default.findByIdAndUpdate(req.user._id, {
      $push: { tournaments: tournament }
    });
    return res.status(_httpStatus2.default.CREATED).json(tournament);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getTournaments(req, res) {
  try {
    const tournaments = await _tournament2.default.find().populate('user').populate('teams', 'teamName');
    return res.status(_httpStatus2.default.OK).json(tournaments);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getTournamentById(req, res) {
  try {
    const tournament = await _tournament2.default.findById(req.params.id).populate('user').populate('leaderBoard');
    const teams = await _team2.default.find({
      tournament: req.params.id
    });
    const matches = await _match2.default.find({
      tournamentId: req.params.id
    }).populate('teamA').populate('teamB').sort({ round: 1 });
    const pointsArr = [];
    for (let i = 0; i < teams.length; i++) {
      const team = await _team2.default.findById(teams[i]);
      const info = await team.getTournamentTotalPoints();
      pointsArr.push(info);
    }
    pointsArr.sort((a, b) => a.points === b.points ? b.totalGoals - a.totalGoals : b.points - a.points);
    // console.log('I\'ll kill you motherfucker',pointsArr);
    return res.status(_httpStatus2.default.OK).json(Object.assign({}, tournament.toJSON(), {
      matches,
      pointsArr
    }));
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function createMatches(req, res) {
  try {
    const calendar = await _tournament2.default.findByIdAndUpdate(req.params.id);
    calendar.createCalendar();
    calendar.save();
    return res.status(_httpStatus2.default.OK).json(calendar);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function updateTournament(req, res) {
  try {
    const update = await _tournament2.default.findByIdAndUpdate(req.params.id);
    Object.keys(req.body).forEach(key => {
      update[key] = req.body[key];
    });
    return res.status(_httpStatus2.default.ACCEPTED).json(update.save());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function deleteTournament(req, res) {
  try {
    const tournament = await _tournament2.default.findById(req.params.id);
    tournament.remove();
    return res.sendStatus(_httpStatus2.default.OK);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getTournamentsByUserId(req, res) {
  try {
    const tournaments = await _tournament2.default.find({
      user: req.params.id
    });
    return res.status(_httpStatus2.default.OK).json(tournaments);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getTournamentByTeamId(req, res) {
  try {
    const tournament = await _tournament2.default.find({
      teams: req.params.id
    }).populate('teams');
    return res.status(_httpStatus2.default.OK).json(tournament);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(9);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _tournament = __webpack_require__(22);

var tournamentController = _interopRequireWildcard(_tournament);

var _auth = __webpack_require__(5);

var _tournament2 = __webpack_require__(24);

var _tournament3 = _interopRequireDefault(_tournament2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.post('/createTournament', _auth.authJwt, _auth.creatorIsRequired, (0, _expressValidation2.default)(_tournament3.default.createTournament), tournamentController.createTournament);

routes.post('/:id', _auth.authJwt, _auth.creatorIsRequired, tournamentController.createMatches);

routes.get('/', _auth.authJwt, tournamentController.getTournaments);

routes.get('/:id', _auth.authJwt, tournamentController.getTournamentById);

routes.get('/tournamentId/:id', _auth.authJwt, _auth.creatorIsRequired, tournamentController.getTournamentsByUserId);

routes.patch('/:id', _auth.authJwt, _auth.creatorIsRequired, tournamentController.updateTournament);

routes.delete('/:id', _auth.authJwt, _auth.creatorIsRequired, tournamentController.deleteTournament);

routes.get('/team/:id', _auth.authJwt, tournamentController.getTournamentByTeamId);

exports.default = routes;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(10);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createTournament: {
    body: {
      tournamentName: _joi2.default.string().required(),
      numberOfTeams: _joi2.default.number().integer().positive().required(),
      minimumNumPlayers: _joi2.default.number().integer().positive().required(),
      // TODO: change this to be a date type
      startDate: _joi2.default.string().required(),
      state: _joi2.default.string().required(),
      address: _joi2.default.string().required(),
      city: _joi2.default.string().required(),
      zipCode: _joi2.default.number().integer().positive().required()
    }
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(8);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

function login(req, res, next) {
  res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());
  return next();
}

async function getUser(req, res) {
  try {
    const user = await _user2.default.findById(req.user._id);
    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function updateUser(req, res) {
  console.log(req.body);
  try {
    const userUpdate = await _user2.default.findById(req.params.id);
    Object.keys(req.body).forEach(key => {
      userUpdate[key] = req.body[key];
    });
    await userUpdate.save();
    return res.status(_httpStatus2.default.OK).json(userUpdate.toAuthJSON());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await _user2.default.findById(req.params.id);
    await user.remove();
    return res.sendStatus(_httpStatus2.default.OK);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(9);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = __webpack_require__(5);

var _user = __webpack_require__(25);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(11);

var _user3 = _interopRequireDefault(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signUp);
routes.post('/login', _auth.authLocal, userController.login);
routes.get('/me', _auth.authJwt, userController.getUser);
routes.patch('/me/:id', _auth.authJwt, userController.updateUser);
routes.delete('/me/:id', _auth.authJwt, userController.deleteUser);

exports.default = routes;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("roundrobin");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })
/******/ ]);