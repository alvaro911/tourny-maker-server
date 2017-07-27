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
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
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
  MONGO_URL: 'mongodb://localhost/tourny-maker-prod'
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(37);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(27);

var _jsonwebtoken = __webpack_require__(32);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(11);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

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
    enum: ['PLAYER', 'CREATOR', 'ADMIN']
  }
}, { timeStamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
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
      email: this.email
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MatchSchema = new _mongoose.Schema({
  round: {
    type: Number
  },
  teamA: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  goalsA: {
    type: Number,
    default: 0
  },
  teamB: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  goalsB: {
    type: Number,
    default: 0
  },
  fullTime: {
    type: Boolean,
    default: false
  },
  matches: {
    type: _mongoose.Schema.Types.Mixed
  },
  tournamentId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
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
      tournament_id: this.tournament_id
    };
  }
};

exports.default = _mongoose2.default.model('Match', MatchSchema);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TeamSchema = new _mongoose.Schema({
  teamName: {
    type: String,
    trim: true,
    unique: true,
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
  points: {
    type: Number,
    default: 0
  },
  totalGoals: {
    type: Number,
    default: 0
  },
  position: {
    type: Number,
    default: 1
  }
}, { timeStamps: true });

TeamSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      teamName: this.teamName,
      players: this.players,
      points: this.points,
      gameResult: this.gameResult
    };
  },
  addPoints() {
    switch (this.gameResult) {
      case 'WIN':
        return 3;
      case 'DRAW':
        return 1;
      default:
        return 0;
    }
  },
  savePoints() {
    this.points = this.addPoints();
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.creatorJwt = exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(12);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(35);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(34);

var _user = __webpack_require__(3);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(2);

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

const creatorStrategy = new _passportJwt.Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await _user2.default.findById(payload._id);

    if (!user || user.role !== 'CREATOR') {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(localStg);
_passport2.default.use(jwtStrategy);
_passport2.default.use(creatorStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', {
  session: false
});
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', {
  session: false
});
const creatorJwt = exports.creatorJwt = _passport2.default.authenticate('jwt', {
  session: false
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _roundrobin = __webpack_require__(36);

var _roundrobin2 = _interopRequireDefault(_roundrobin);

var _match = __webpack_require__(5);

var _match2 = _interopRequireDefault(_match);

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
  // TODO: change this to be a date type
  tournamentStarts: {
    type: String,
    trim: true,
    required: [true, 'Provide a starting date']
  },
  // TODO: change this to be a date type©
  willBePlayed: {
    type: String,
    trim: true,
    required: [true, 'How often will tournaments play?']
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

async function createMatch(week, game, tournamentId) {
  return await _match2.default.create({
    round: week,
    teamA: game[0],
    teamB: game[1],
    tournamentId
  });
}

TournamentSchema.methods = {
  async createCalendar(teams = this.teams, numberOfTeams = this.numberOfTeams) {
    if (teams.length === numberOfTeams) {
      (0, _roundrobin2.default)(teams.length, teams).forEach((round, i) => {
        const week = i + 1;

        round.forEach(async game => await createMatch(week, game, this._id));
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(9);

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


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
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

var _constants = __webpack_require__(2);

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

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _match = __webpack_require__(5);

var _match2 = _interopRequireDefault(_match);

var _team = __webpack_require__(6);

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function matchById(req, res) {
  try {
    const matchId = await _match2.default.findById(req.params.id);
    return res.status(_httpStatus2.default.OK).json(matchId);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}
// import TournamentModel from '../tournament/tournament.model';
// import mongoose from 'mongoose';
async function matchResult(req, res) {
  try {
    const { teamA, teamB, goalsA, goalsB } = req.body;
    const match = await _match2.default.findByIdAndUpdate(req.params.id, {
      goalsA,
      goalsB,
      fullTime: true
    }, { new: true });
    if (goalsA > goalsB) {
      await _team2.default.findByIdAndUpdate(teamA, { $inc: { points: 3, totalGoals: goalsA } }, { new: true });
    } else if (goalsA < goalsB) {
      await _team2.default.findByIdAndUpdate(teamB, { $inc: { points: 3, totalGoals: goalsB } }, { new: true });
    } else {
      await _team2.default.findByIdAndUpdate(teamA, { $inc: { points: 1, totalGoals: goalsA } }, { new: true });
      await _team2.default.findByIdAndUpdate(teamB, { $inc: { points: 1, totalGoals: goalsB } }, { new: true });
    }
    return res.status(_httpStatus2.default.OK).json(match);
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = (0, _express.Router)();

routes.get('/:id', MatchController.matchById);

routes.patch('/:id', MatchController.matchResult);

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

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _team = __webpack_require__(6);

var _team2 = _interopRequireDefault(_team);

var _user = __webpack_require__(3);

var _user2 = _interopRequireDefault(_user);

var _tournament = __webpack_require__(10);

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
    await _user2.default.findByIdAndUpdate(req.user._id, { team });
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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(8);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _team = __webpack_require__(19);

var TeamController = _interopRequireWildcard(_team);

var _auth = __webpack_require__(7);

var _team2 = __webpack_require__(21);

var _team3 = _interopRequireDefault(_team2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.get('/:id', TeamController.getTeamById);

routes.post('/createTeam', _auth.authJwt, (0, _expressValidation2.default)(_team3.default.createTeam), TeamController.createTeam);

exports.default = routes;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(9);

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

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _tournament = __webpack_require__(10);

var _tournament2 = _interopRequireDefault(_tournament);

var _user = __webpack_require__(3);

var _user2 = _interopRequireDefault(_user);

var _match = __webpack_require__(5);

var _match2 = _interopRequireDefault(_match);

__webpack_require__(6);

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
    const tournament = await _tournament2.default.findById(req.params.id).populate('user').populate('teams').populate('leaderBoard');
    const matches = await _match2.default.find({
      tournament_id: req.params.id
    });
    return res.status(_httpStatus2.default.OK).json(Object.assign({}, tournament.toJSON(), {
      matches
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

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(8);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _tournament = __webpack_require__(22);

var tournamentController = _interopRequireWildcard(_tournament);

var _auth = __webpack_require__(7);

var _tournament2 = __webpack_require__(24);

var _tournament3 = _interopRequireDefault(_tournament2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.post('/createTournament', _auth.creatorJwt, (0, _expressValidation2.default)(_tournament3.default.createTournament), tournamentController.createTournament);

routes.post('/:id', _auth.creatorJwt, tournamentController.createMatches);

routes.get('/', _auth.authJwt, tournamentController.getTournaments);

routes.get('/:id', _auth.authJwt, tournamentController.getTournamentById);

exports.default = routes;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createTournament: {
    body: {
      tournamentName: _joi2.default.string().required(),
      numberOfTeams: _joi2.default.number().integer().positive().required(),
      minimumNumPlayers: _joi2.default.number().integer().positive().required(),
      // TODO: change this to be a date type
      tournamentStarts: _joi2.default.string().required(),
      willBePlayed: _joi2.default.string().required(),
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

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(3);

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
  try {
    const userUpdate = await _user2.default.findById(req.user._id);
    Object.keys(req.body).forEach(key => {
      userUpdate[key] = req.body[key];
    });
    return res.status(_httpStatus2.default.OK).json((await userUpdate.save()));
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

var _expressValidation = __webpack_require__(8);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = __webpack_require__(7);

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
routes.patch('/me', _auth.authJwt, userController.updateUser);
routes.delete('/me', _auth.authJwt, userController.deleteUser);

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