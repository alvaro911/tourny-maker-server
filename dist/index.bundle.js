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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(15);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

exports.default = {
  signup: {
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().regex(passwordReg).required(),
    firstName: _joi2.default.string().required(),
    lastName: _joi2.default.string().required(),
    username: _joi2.default.string().required()
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(16);

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = __webpack_require__(14);

var _helmet2 = _interopRequireDefault(_helmet);

var _bodyParser = __webpack_require__(11);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(12);

var _compression2 = _interopRequireDefault(_compression);

var _passport = __webpack_require__(28);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(10);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/users', _user2.default);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(4);

var _middlewares = __webpack_require__(5);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _models = __webpack_require__(6);

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable no-console */

(0, _middlewares2.default)(app);

app.get('/', (req, res) => {
  res.send('Hello nurse!');
});

(0, _models2.default)(app);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.login = login;

var _user = __webpack_require__(9);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
}

function login(req, res) {
  res.status(200).json(req.user);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(17);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(18);

var _jsonwebtoken = __webpack_require__(59);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(2);

var _constants = __webpack_require__(0);

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
  }
});

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
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`,
      email: this.email
    };
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(13);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = __webpack_require__(37);

var _user = __webpack_require__(8);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(2);

var _user3 = _interopRequireDefault(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signUp);
routes.post('/login', _auth.authLocal, userController.login);

exports.default = routes;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(19);

var BCRYPT_SALT_LEN = 16;

var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
var BLOWFISH_NUM_ROUNDS = 16;

var MAX_EXECUTION_TIME = 100;
var P_orig = [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822,
		0x299f31d0, 0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377,
		0xbe5466cf, 0x34e90c6c, 0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5,
		0xb5470917, 0x9216d5d9, 0x8979fb1b];
var S_orig = [0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed,
		0x6a267e96, 0xba7c9045, 0xf12c7f99, 0x24a19947, 0xb3916cf7,
		0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3,
		0xf4933d7e, 0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee,
		0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013, 0xc5d1b023,
		0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
		0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda,
		0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
		0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af,
		0x7c72e993, 0xb3ee1411, 0x636fbc2a, 0x2ba9c55d, 0x741831f6,
		0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c, 0x7a325381,
		0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
		0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032, 0xef845d5d,
		0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5,
		0x0f6d6ff3, 0x83f44239, 0x2e0b4482, 0xa4842004, 0x69c8f04a,
		0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
		0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c,
		0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176,
		0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3,
		0x3b8b5ebe, 0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6,
		0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d, 0x37d0d724,
		0xd00a1248, 0xdb0fead3, 0x49f1c09b, 0x075372c9, 0x80991b7b,
		0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b, 0x976ce0bd,
		0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
		0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f,
		0x9b30952c, 0xcc814544, 0xaf5ebd09, 0xbee3d004, 0xde334afd,
		0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39,
		0xb9d3fbdb, 0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
		0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8, 0x3c7516df,
		0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760,
		0x53317b48, 0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e,
		0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
		0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0, 0x10fa3d98,
		0xfd2183b8, 0x4afcb56c, 0x2dd1d35b, 0x9a53e479, 0xb6f84565,
		0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33, 0x62fb1341,
		0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
		0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0, 0xd08ed1d0,
		0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64,
		0x8888b812, 0x900df01c, 0x4fad5ea0, 0x688fc31c, 0xd1cff191,
		0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
		0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0,
		0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705,
		0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5,
		0xfb9d35cf, 0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49,
		0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af, 0x2464369b,
		0xf009b91e, 0x5563911d, 0x59dfa6aa, 0x78c14389, 0xd95a537f,
		0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9, 0x11c81968,
		0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
		0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5,
		0x571be91f, 0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6,
		0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799,
		0x6e85076a, 0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623,
		0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266, 0xecaa8c71,
		0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29,
		0xa0591340, 0xe4183a3e, 0x3f54989a, 0x5b429d65, 0x6b8fe4d6,
		0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
		0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e, 0x09686b3f,
		0x3ebaefc9, 0x3c971814, 0x6b6a70a1, 0x687f3584, 0x52a0e286,
		0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c, 0x8e7d44ec,
		0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
		0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9,
		0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc,
		0xc8b57634, 0x9af3dda7, 0xa9446146, 0x0fd0030e, 0xecc8c73e,
		0xa4751e41, 0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
		0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290,
		0x24977c79, 0x5679b072, 0xbcaf89af, 0xde9a771f, 0xd9930810,
		0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6,
		0x9f84cd87, 0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c,
		0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2, 0xef1c1847,
		0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43, 0x2a65c451,
		0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55, 0x81ac77d6,
		0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
		0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570,
		0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa,
		0x2965dcb9, 0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978,
		0x9c10b36a, 0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4,
		0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960, 0x5223a708,
		0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883,
		0xb17f37d1, 0x018cff28, 0xc332ddef, 0xbe6c5aa5, 0x65582185,
		0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
		0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510, 0x13cca830,
		0xeb61bd96, 0x0334fe1e, 0xaa0363cf, 0xb5735c90, 0x4c70a239,
		0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab,
		0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
		0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19,
		0x875fa099, 0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77,
		0x11ed935f, 0x16681281, 0x0e358829, 0xc7e61fd6, 0x96dedfa1,
		0x7858ba99, 0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
		0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef,
		0x34c6ffea, 0xfe28ed61, 0xee7c3c73, 0x5d4a14d9, 0xe864b7e3,
		0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15,
		0xfacb4fd0, 0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105,
		0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250, 0xcf62a1f2,
		0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492,
		0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d, 0x1462b174,
		0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
		0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759,
		0xcbee7460, 0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e,
		0xe8efd855, 0x61d99735, 0xa969a7aa, 0xc50c06c2, 0x5a04abfc,
		0x800bcadc, 0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9,
		0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340, 0xc5c43465,
		0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a,
		0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7, 0xf64c261c,
		0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
		0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e,
		0x97244546, 0x14214f74, 0xbf8b8840, 0x4d95fc1d, 0x96b591af,
		0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0,
		0x31cb8504, 0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
		0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462,
		0xd7486900, 0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c,
		0xb58ce006, 0x7af4d6b6, 0xaace1e7c, 0xd3375fec, 0xce78a399,
		0x406b2a42, 0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
		0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74,
		0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e, 0xd8feb397,
		0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7,
		0xd096954b, 0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
		0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c, 0xfdf8e802,
		0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22,
		0x48c1133f, 0xc70f86dc, 0x07f9c9ee, 0x41041f0f, 0x404779a4,
		0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
		0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2,
		0x02e1329e, 0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1,
		0x3b240b62, 0xeebeb922, 0x85b2a20e, 0xe6ba0d99, 0xde720c8c,
		0x2da2f728, 0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0,
		0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e, 0x0a476341,
		0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8,
		0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b,
		0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
		0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88,
		0x515bad24, 0x7b9479bf, 0x763bd6eb, 0x37392eb3, 0xcc115979,
		0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc,
		0x782ef11c, 0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
		0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659,
		0x0a121386, 0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f,
		0xbebfe988, 0x64e4c3fe, 0x9dbc8057, 0xf0f7c086, 0x60787bf8,
		0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
		0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be,
		0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
		0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255,
		0x46fcd9b9, 0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2,
		0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c, 0xb90bace1,
		0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09,
		0x662d09a1, 0xc4324633, 0xe85a1f02, 0x09f0be8c, 0x4a99a025,
		0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
		0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01,
		0xa70683fa, 0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641,
		0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0, 0x006058aa,
		0x30dc7d62, 0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634,
		0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76, 0x6f05e409,
		0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9,
		0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3,
		0x4dad0fc4, 0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
		0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234,
		0x92638212, 0x670efa8e, 0x406000e0, 0x3a39ce37, 0xd3faf5cf,
		0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740,
		0x99bc9bbe, 0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
		0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f,
		0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d,
		0xd5730a1d, 0x4cd04dc6, 0x2939bbdb, 0xa9ba4650, 0xac9526e8,
		0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
		0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba,
		0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1,
		0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69,
		0x77fa0a59, 0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593,
		0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a,
		0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b,
		0x5ad6b472, 0x5a88f54c, 0xe029ac71, 0xe019a5e6, 0x47b0acfd,
		0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
		0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4,
		0x88f46dba, 0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2,
		0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb,
		0x26dcf319, 0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb,
		0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f, 0x4de81751,
		0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce,
		0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369,
		0x6413e680, 0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
		0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd,
		0x1b588d40, 0xccd2017f, 0x6bb4e3bb, 0xdda26a7e, 0x3a59ff45,
		0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae,
		0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
		0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08,
		0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d,
		0x06b89fb4, 0xce6ea048, 0x6f3f3b82, 0x3520ab82, 0x011a1d4b,
		0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
		0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e,
		0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a,
		0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c,
		0xe0b12b4f, 0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c,
		0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525, 0xfae59361,
		0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c,
		0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b, 0x4c98a0be,
		0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
		0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d,
		0x9b992f2e, 0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891,
		0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5,
		0xf6fb2299, 0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02,
		0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc, 0xde966292,
		0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a,
		0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2,
		0x35bdd2f6, 0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
		0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c,
		0xf746ce76, 0x77afa1c5, 0x20756060, 0x85cbfe4e, 0x8ae88dd8,
		0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4,
		0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
		0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6];
var bf_crypt_ciphertext = [0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253,
		0x63727944, 0x6f756274];
var base64_code = ['.', '/', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
		'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
		'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8',
		'9'];
var index_64 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
		54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1,
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
		49, 50, 51, 52, 53, -1, -1, -1, -1, -1];

function getByte(c) {
	var ret = 0;
	try {
		var b = c.charCodeAt(0);
	} catch (err) {
		b = c;
	}
	if (b > 127) {
		return -128 + (b % 128);
	} else {
		return b;
	}
};

function encode_base64(d, len) {
	var off = 0;
	var rs = [];
	var c1;
	var c2;
	if (len <= 0 || len > d.length)
		throw "Invalid len";
	while (off < len) {
		c1 = d[off++] & 0xff;
		rs.push(base64_code[(c1 >> 2) & 0x3f]);
		c1 = (c1 & 0x03) << 4;
		if (off >= len) {
			rs.push(base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 4) & 0x0f;
		rs.push(base64_code[c1 & 0x3f]);
		c1 = (c2 & 0x0f) << 2;
		if (off >= len) {
			rs.push(base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 6) & 0x03;
		rs.push(base64_code[c1 & 0x3f]);
		rs.push(base64_code[c2 & 0x3f]);
	}
	return rs.join('');
};

function char64(x) {
	var code = x.charCodeAt(0);
	if (code < 0 || code > index_64.length) {
		return -1;
	}
	return index_64[code];
};

function decode_base64(s, maxolen) {
	var off = 0;
	var slen = s.length;
	var olen = 0;
	var rs = [];
	var c1, c2, c3, c4, o;
	if (maxolen <= 0) throw "Invalid maxolen";
	while (off < slen - 1 && olen < maxolen) {
		c1 = char64(s.charAt(off++));
		c2 = char64(s.charAt(off++));
		if (c1 == -1 || c2 == -1) {
			break;
		}
		o = getByte(c1 << 2);
		o |= (c2 & 0x30) >> 4;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c3 = char64(s.charAt(off++));
		if (c3 == -1) {
			break;
		}
		o = getByte((c2 & 0x0f) << 4);
		o |= (c3 & 0x3c) >> 2;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c4 = char64(s.charAt(off++));
		o = getByte((c3 & 0x03) << 6);
		o |= c4;
		rs.push(String.fromCharCode(o));
		++olen;
	}
	var ret = [];
	for (off = 0; off < olen; off++) {
		ret.push(getByte(rs[off]));
	}
	return ret;
};

function encipher(lr, off, P, S) {
	var i;
	var n;
	var l = lr[off];
	var r = lr[off + 1];

	l ^= P[0];
	for (i = 0; i <= BLOWFISH_NUM_ROUNDS - 2;) {
		// Feistel substitution on left word
		n = S[(l >> 24) & 0xff];
		n += S[0x100 | ((l >> 16) & 0xff)];
		n ^= S[0x200 | ((l >> 8) & 0xff)];
		n += S[0x300 | (l & 0xff)];
		r ^= n ^ P[++i];

		// Feistel substitution on right word
		n = S[(r >> 24) & 0xff];
		n += S[0x100 | ((r >> 16) & 0xff)];
		n ^= S[0x200 | ((r >> 8) & 0xff)];
		n += S[0x300 | (r & 0xff)];
		l ^= n ^ P[++i];
	}
	lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
	lr[off + 1] = l;
	return lr;
};

function streamtoword(data, offp) {
	var i;
	var word = 0;
	for (i = 0; i < 4; i++) {
		word = (word << 8) | (data[offp] & 0xff);
		offp = (offp + 1) % data.length;
	}
	return {key:word, offp:offp};
};

function key(key, P, S) {
	var i;
	var offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = P.length;
	var slen = S.length;

	for (i = 0; i < plen; i++) {
		var sw = streamtoword(key, offp);
		offp = sw.offp;
		P[i] = P[i] ^ sw.key;
	}
	for (i = 0; i < plen; i += 2) {
		lr = encipher(lr, 0, P, S);
		P[i] = lr[0];
		P[i + 1] = lr[1];
	}

	for (i = 0; i < slen; i += 2) {
		lr = encipher(lr, 0, P, S);
		S[i] = lr[0];
		S[i + 1] = lr[1];
	}
};

function ekskey(data, key, P, S) {
	var i;
	var offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = P.length;
	var slen = S.length;
	var sw;

	for (i = 0; i < plen; i++) {
		sw = streamtoword(key, offp);
		offp = sw.offp;
		P[i] = P[i] ^ sw.key;
	}
	offp = 0;
	for (i = 0; i < plen; i += 2) {
		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[0] ^= sw.key;

		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[1] ^= sw.key;

		lr = encipher(lr, 0, P, S);
		P[i] = lr[0];
		P[i + 1] = lr[1];
	}
	for (i = 0; i < slen; i += 2) {
		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[0] ^= sw.key;

		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[1] ^= sw.key;

		lr = encipher(lr, 0, P, S);
		S[i] = lr[0];
		S[i + 1] = lr[1];
	}
};

function crypt_raw(password, salt, log_rounds, progress) {
	var rounds;
	var j;
	var cdata = bf_crypt_ciphertext.slice();
	var clen = cdata.length;
	var one_percent;

	if (log_rounds < 4 || log_rounds > 31)
		throw "Bad number of rounds";
	if (salt.length != BCRYPT_SALT_LEN)
		throw "Bad salt length";

	rounds = 1 << log_rounds;
	one_percent = Math.floor(rounds / 100) + 1;

	var P = P_orig.slice();
	var S = S_orig.slice();

	ekskey(salt, password, P, S);

	var i = 0;

	while(true) {
		if(i < rounds){
			var start = new Date();
			for (; i < rounds;) {
				i = i + 1;
				key(password, P, S);
				key(salt, P, S);
		                if(i % one_percent == 0){
			        	progress();
                		}
		                if((new Date() - start) > MAX_EXECUTION_TIME){
                    			break;
		                }
            		}
        	} else {
 	        	for (i = 0; i < 64; i++) {
                		for (j = 0; j < (clen >> 1); j++) {
                    			lr = encipher(cdata, j << 1, P, S);
                		}
            		}
			var ret = [];
		        for (i = 0; i < clen; i++) {
                		ret.push(getByte((cdata[i] >> 24) & 0xff));
                		ret.push(getByte((cdata[i] >> 16) & 0xff));
                		ret.push(getByte((cdata[i] >> 8) & 0xff));
                		ret.push(getByte(cdata[i] & 0xff));
            		}
            		return(ret);
        	}
	}
};

function hashpw(password, salt, progress) {
	var real_salt;
	var passwordb = [];
	var saltb = [];
	var hashed = [];
	var minor = String.fromCharCode(0);
	var rounds = 0;
	var off = 0;

	if (!progress){
	        var progress = function() {};
	}

	if (salt.charAt(0) != '$' || salt.charAt(1) != '2')
		throw "Invalid salt version";
	if (salt.charAt(2) == '$')
		off = 3;
	else {
		minor = salt.charAt(2);
		if (minor != 'a' || salt.charAt(3) != '$')
			throw "Invalid salt revision";
		off = 4;
	}

	// Extract number of rounds
	if (salt.charAt(off + 2) > '$')
		throw "Missing salt rounds";
	var r1 = parseInt(salt.substring(off, off + 1)) * 10;
	var r2 = parseInt(salt.substring(off + 1, off + 2));
	rounds = r1 + r2;
	real_salt = salt.substring(off + 3, off + 25);
	password = password + (minor >= 'a' ? "\000" : "");

	var buf = new Buffer(password);
	for (var r = 0; r < buf.length; r++) {
		passwordb.push(buf[r]);
	}
	saltb = decode_base64(real_salt, BCRYPT_SALT_LEN);
	var hashed = crypt_raw(passwordb, saltb, rounds, progress);

	var rs = [];
	rs.push("$2");
	if (minor >= 'a')
		rs.push(minor);
	rs.push("$");
	if (rounds < 10)
		rs.push("0");
	rs.push(rounds.toString());
	rs.push("$");
	rs.push(encode_base64(saltb, saltb.length));
	rs.push(encode_base64(hashed, bf_crypt_ciphertext.length * 4 - 1));

	return(rs.join(''));
};

function gensalt(rounds) {
	var iteration_count = rounds;
	if (iteration_count < 4 || iteration_count > 31) {
		iteration_count = GENSALT_DEFAULT_LOG2_ROUNDS;
	}
	var output = [];
	output.push("$2a$");
	if (iteration_count < 10)
		output.push("0");
	output.push(iteration_count.toString());
	output.push('$');

	var rand_buf;
	try {
		rand_buf = crypto.randomBytes(BCRYPT_SALT_LEN);
	} catch (ex) {
		throw ex;
	}

	output.push(encode_base64(rand_buf, BCRYPT_SALT_LEN));
	return output.join('');
};

function genSaltSync(rounds) {
	/*
		rounds - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
		seed_length - [OPTIONAL] - RAND_bytes wants a length. to make that a bit flexible, you can specify a seed_length. (default - 20)
	*/
	if(!rounds) {
		rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
	}
	return gensalt(rounds);
}

function genSalt(rounds, callback) {
	/*
		rounds - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
		seed_length - [OPTIONAL] - RAND_bytes wants a length. to make that a bit flexible, you can specify a seed_length. (default - 20)
		callback - [REQUIRED] - a callback to be fired once the salt has been generated. uses eio making it asynchronous.
			error - First parameter to the callback detailing any errors.
			salt - Second parameter to the callback providing the generated salt.
	*/
	if(!callback) {
		throw "No callback function was given."
	}
	process.nextTick(function() {
		var result = null;
		var error = null;
		try {
			result = genSaltSync(rounds)
		} catch(err) {
			error = err;
		}
		callback(error, result);
	});
}

function hashSync(data, salt, progress) {
	/*
		data - [REQUIRED] - the data to be encrypted.
		salt - [REQUIRED] - the salt to be used in encryption.
	*/
	if(!salt) {
		salt = genSaltSync();
	}
	return hashpw(data, salt, progress);
}

function hash(data, salt, progress, callback) {
	/*
		data - [REQUIRED] - the data to be encrypted.
		salt - [REQUIRED] - the salt to be used to hash the password. if specified as a number then a salt will be generated and used (see examples).
		progress - a callback to be called during the hash calculation to signify progress
		callback - [REQUIRED] - a callback to be fired once the data has been encrypted. uses eio making it asynchronous.
			error - First parameter to the callback detailing any errors.
			encrypted - Second parameter to the callback providing the encrypted form.
	*/
	if(!callback) {
		throw "No callback function was given."
	}
	process.nextTick(function() {
		var result = null;
		var error = null;
		try {
			result = hashSync(data, salt, progress)
		} catch(err) {
			error = err;
		}
		callback(error, result);
	});
}

function compareSync(data, encrypted) {
	/*
		data - [REQUIRED] - data to compare.
		encrypted - [REQUIRED] - data to be compared to.
	*/

	if(typeof data != "string" ||  typeof encrypted != "string") {
		throw "Incorrect arguments";
	}

	var encrypted_length = encrypted.length;

	if(encrypted_length != 60) {
		throw "Not a valid BCrypt hash.";
	}

	var same = true;
	var hash_data = hashSync(data, encrypted.substr(0, encrypted_length-31));
	var hash_data_length = hash_data.length;

	same = hash_data_length == encrypted_length;

	var max_length = (hash_data_length < encrypted_length) ? hash_data_length : encrypted_length;

	// to prevent timing attacks, should check entire string
	// don't exit after found to be false
	for (var i = 0; i < max_length; ++i) {
		if (hash_data_length >= i && encrypted_length >= i && hash_data[i] != encrypted[i]) {
			same = false;
		}
	}

	return same;
}

function compare(data, encrypted, callback) {
	/*
		data - [REQUIRED] - data to compare.
		encrypted - [REQUIRED] - data to be compared to.
		callback - [REQUIRED] - a callback to be fired once the data has been compared. uses eio making it asynchronous.
			error - First parameter to the callback detailing any errors.
			same - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
	*/
	if(!callback) {
		throw "No callback function was given."
	}
	process.nextTick(function() {
		var result = null;
		var error = null;
		try {
			result = compareSync(data, encrypted)
		} catch(err) {
			error = err;
		}
		callback(error, result);
	});
}

function getRounds(encrypted) {
	//encrypted - [REQUIRED] - hash from which the number of rounds used should be extracted.
	if(typeof encrypted != "string") {
		throw "Incorrect arguments";
	}
	return Number(encrypted.split("$")[2]);
}

exports.genSaltSync = genSaltSync;
exports.genSalt = genSalt;
exports.hashSync = hashSync;
exports.hash = hash;
exports.compareSync = compareSync;
exports.compare = compare;
exports.getRounds = getRounds;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(25);


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var initialize = __webpack_require__(30)
  , authenticate = __webpack_require__(29);
  
/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 *
 * @return {Object}
 * @api protected
 */
exports = module.exports = function() {
  
  // HTTP extensions.
  exports.__monkeypatchNode();
  
  return {
    initialize: initialize,
    authenticate: authenticate
  };
};

exports.__monkeypatchNode = function() {
  var http = __webpack_require__(24);
  var IncomingMessageExt = __webpack_require__(22);
  
  http.IncomingMessage.prototype.login =
  http.IncomingMessage.prototype.logIn = IncomingMessageExt.logIn;
  http.IncomingMessage.prototype.logout =
  http.IncomingMessage.prototype.logOut = IncomingMessageExt.logOut;
  http.IncomingMessage.prototype.isAuthenticated = IncomingMessageExt.isAuthenticated;
  http.IncomingMessage.prototype.isUnauthenticated = IncomingMessageExt.isUnauthenticated;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * Module dependencies.
 */
//var http = require('http')
//  , req = http.IncomingMessage.prototype;


var req = exports = module.exports = {};

/**
 * Intiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login =
req.logIn = function(user, options, done) {
  if (typeof options == 'function') {
    done = options;
    options = {};
  }
  options = options || {};
  
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  var session = (options.session === undefined) ? true : options.session;
  
  this[property] = user;
  if (session) {
    if (!this._passport) { throw new Error('passport.initialize() middleware not in use'); }
    if (typeof done != 'function') { throw new Error('req#login requires a callback function'); }
    
    var self = this;
    this._passport.instance.serializeUser(user, this, function(err, obj) {
      if (err) { self[property] = null; return done(err); }
      if (!self._passport.session) {
        self._passport.session = {};
      }
      self._passport.session.user = obj;
      if (!self.session) {
        self.session = {};
      }
      self.session[self._passport.instance._key] = self._passport.session;
      done();
    });
  } else {
    done && done();
  }
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  this[property] = null;
  if (this._passport && this._passport.session) {
    delete this._passport.session.user;
  }
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  return (this[property]) ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var pause = __webpack_require__(31)
  , util = __webpack_require__(32)
  , Strategy = __webpack_require__(20);


/**
 * `SessionStrategy` constructor.
 *
 * @api public
 */
function SessionStrategy() {
  Strategy.call(this);
  this.name = 'session';
}

/**
 * Inherit from `Strategy`.
 */
util.inherits(SessionStrategy, Strategy);

/**
 * Authenticate request based on the current session state.
 *
 * The session authentication strategy uses the session to restore any login
 * state across requests.  If a login session has been established, `req.user`
 * will be populated with the current user.
 *
 * This strategy is registered automatically by Passport.
 *
 * @param {Object} req
 * @param {Object} options
 * @api protected
 */
SessionStrategy.prototype.authenticate = function(req, options) {
  if (!req._passport) { return this.error(new Error('passport.initialize() middleware not in use')); }
  options = options || {};

  var self = this, 
      su;
  if (req._passport.session) {
    su = req._passport.session.user;
  }

  if (su || su === 0) {
    // NOTE: Stream pausing is desirable in the case where later middleware is
    //       listening for events emitted from request.  For discussion on the
    //       matter, refer to: https://github.com/jaredhanson/passport/pull/106
    
    var paused = options.pauseStream ? pause(req) : null;
    req._passport.instance.deserializeUser(su, req, function(err, user) {
      if (err) { return self.error(err); }
      if (!user) {
        delete req._passport.session.user;
        self.pass();
        if (paused) {
          paused.resume();
        }
        return;
      }
      var property = req._passport.instance._userProperty || 'user';
      req[property] = user;
      self.pass();
      if (paused) {
        paused.resume();
      }
    });
  } else {
    self.pass();
  }
};


/**
 * Expose `SessionStrategy`.
 */
module.exports = SessionStrategy;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * Creates an instance of `Strategy`.
 *
 * @constructor
 * @api public
 */
function Strategy() {
}

/**
 * Authenticate request.
 *
 * This function must be overridden by subclasses.  In abstract form, it always
 * throws an exception.
 *
 * @param {Object} req The request to authenticate.
 * @param {Object} [options] Strategy-specific options.
 * @api public
 */
Strategy.prototype.authenticate = function(req, options) {
  throw new Error('Strategy#authenticate must be overridden by subclass');
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var SessionStrategy = __webpack_require__(23);


/**
 * `Authenticator` constructor.
 *
 * @api public
 */
function Authenticator() {
  this._key = 'passport';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;
  this._userProperty = 'user';
  
  this.init();
}

/**
 * Initialize authenticator.
 *
 * @api protected
 */
Authenticator.prototype.init = function() {
  this.framework(__webpack_require__(21)());
  this.use(new SessionStrategy());
};

/**
 * Utilize the given `strategy` with optional `name`, overridding the strategy's
 * default name.
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy(...));
 *
 *     passport.use('api', new http.BasicStrategy(...));
 *
 * @param {String|Strategy} name
 * @param {Strategy} strategy
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) { throw new Error('Authentication strategies must have a name'); }
  
  this._strategies[name] = strategy;
  return this;
};

/**
 * Un-utilize the `strategy` with given `name`.
 *
 * In typical applications, the necessary authentication strategies are static,
 * configured once and always available.  As such, there is often no need to
 * invoke this function.
 *
 * However, in certain situations, applications may need dynamically configure
 * and de-configure authentication strategies.  The `use()`/`unuse()`
 * combination satisfies these scenarios.
 *
 * Examples:
 *
 *     passport.unuse('legacy-api');
 *
 * @param {String} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.unuse = function(name) {
  delete this._strategies[name];
  return this;
};

/**
 * Setup Passport to be used under framework.
 *
 * By default, Passport exposes middleware that operate using Connect-style
 * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
 * have different expectations, and this function allows Passport to be adapted
 * to operate within such environments.
 *
 * If you are using a Connect-compatible framework, including Express, there is
 * no need to invoke this function.
 *
 * Examples:
 *
 *     passport.framework(require('hapi-passport')());
 *
 * @param {Object} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.framework = function(fw) {
  this._framework = fw;
  return this;
};

/**
 * Passport's primary initialization middleware.
 *
 * This middleware must be in use by the Connect/Express application for
 * Passport to operate.
 *
 * Options:
 *   - `userProperty`  Property to set on `req` upon login, defaults to _user_
 *
 * Examples:
 *
 *     app.use(passport.initialize());
 *
 *     app.use(passport.initialize({ userProperty: 'currentUser' }));
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.initialize = function(options) {
  options = options || {};
  this._userProperty = options.userProperty || 'user';
  
  return this._framework.initialize(this, options);
};

/**
 * Middleware that will authenticate a request using the given `strategy` name,
 * with optional `options` and `callback`.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
 *
 *     passport.authenticate('local', function(err, user) {
 *       if (!user) { return res.redirect('/login'); }
 *       res.end('Authenticated!');
 *     })(req, res);
 *
 *     passport.authenticate('basic', { session: false })(req, res);
 *
 *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
 *       // request will be redirected to Twitter
 *     });
 *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
 *       res.json(req.user);
 *     });
 *
 * @param {String} strategy
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authenticate = function(strategy, options, callback) {
  return this._framework.authenticate(this, strategy, options, callback);
};

/**
 * Middleware that will authorize a third-party account using the given
 * `strategy` name, with optional `options`.
 *
 * If authorization is successful, the result provided by the strategy's verify
 * callback will be assigned to `req.account`.  The existing login session and
 * `req.user` will be unaffected.
 *
 * This function is particularly useful when connecting third-party accounts
 * to the local account of a user that is currently authenticated.
 *
 * Examples:
 *
 *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
 *
 * @param {String} strategy
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authorize = function(strategy, options, callback) {
  options = options || {};
  options.assignProperty = 'account';
  
  var fn = this._framework.authorize || this._framework.authenticate;
  return fn(this, strategy, options, callback);
};

/**
 * Middleware that will restore login state from a session.
 *
 * Web applications typically use sessions to maintain login state between
 * requests.  For example, a user will authenticate by entering credentials into
 * a form which is submitted to the server.  If the credentials are valid, a
 * login session is established by setting a cookie containing a session
 * identifier in the user's web browser.  The web browser will send this cookie
 * in subsequent requests to the server, allowing a session to be maintained.
 *
 * If sessions are being utilized, and a login session has been established,
 * this middleware will populate `req.user` with the current user.
 *
 * Note that sessions are not strictly required for Passport to operate.
 * However, as a general rule, most web applications will make use of sessions.
 * An exception to this rule would be an API server, which expects each HTTP
 * request to provide credentials in an Authorization header.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 * Options:
 *   - `pauseStream`      Pause the request stream before deserializing the user
 *                        object from the session.  Defaults to _false_.  Should
 *                        be set to true in cases where middleware consuming the
 *                        request body is configured after passport and the
 *                        deserializeUser method is asynchronous.
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.session = function(options) {
  return this.authenticate('session', options);
};

/**
 * Registers a function used to serialize user objects into the session.
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 * @api public
 */
Authenticator.prototype.serializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._serializers.push(fn);
  }
  
  // private implementation that traverses the chain of serializers, attempting
  // to serialize a user
  var user = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._serializers;
  (function pass(i, err, obj) {
    // serializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or serialized object was obtained, done
    if (err || obj || obj === 0) { return done(err, obj); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to serialize user into session'));
    }
    
    
    function serialized(e, o) {
      pass(i + 1, e, o);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, user, serialized);
      } else {
        layer(user, serialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to deserialize user objects out of the session.
 *
 * Examples:
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.deserializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._deserializers.push(fn);
  }
  
  // private implementation that traverses the chain of deserializers,
  // attempting to deserialize a user
  var obj = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._deserializers;
  (function pass(i, err, user) {
    // deserializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or deserialized user was obtained, done
    if (err || user) { return done(err, user); }
    // a valid user existed when establishing the session, but that user has
    // since been removed
    if (user === null || user === false) { return done(null, false); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to deserialize user out of session'));
    }
    
    
    function deserialized(e, u) {
      pass(i + 1, e, u);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, obj, deserialized);
      } else {
        layer(obj, deserialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to transform auth info.
 *
 * In some circumstances authorization details are contained in authentication
 * credentials or loaded as part of verification.
 *
 * For example, when using bearer tokens for API authentication, the tokens may
 * encode (either directly or indirectly in a database), details such as scope
 * of access or the client to which the token was issued.
 *
 * Such authorization details should be enforced separately from authentication.
 * Because Passport deals only with the latter, this is the responsiblity of
 * middleware or routes further along the chain.  However, it is not optimal to
 * decode the same data or execute the same database query later.  To avoid
 * this, Passport accepts optional `info` along with the authenticated `user`
 * in a strategy's `success()` action.  This info is set at `req.authInfo`,
 * where said later middlware or routes can access it.
 *
 * Optionally, applications can register transforms to proccess this info,
 * which take effect prior to `req.authInfo` being set.  This is useful, for
 * example, when the info contains a client ID.  The transform can load the
 * client from the database and include the instance in the transformed info,
 * allowing the full set of client properties to be convieniently accessed.
 *
 * If no transforms are registered, `info` supplied by the strategy will be left
 * unmodified.
 *
 * Examples:
 *
 *     passport.transformAuthInfo(function(info, done) {
 *       Client.findById(info.clientID, function (err, client) {
 *         info.client = client;
 *         done(err, info);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.transformAuthInfo = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._infoTransformers.push(fn);
  }
  
  // private implementation that traverses the chain of transformers,
  // attempting to transform auth info
  var info = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._infoTransformers;
  (function pass(i, err, tinfo) {
    // transformers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or transformed info was obtained, done
    if (err || tinfo) { return done(err, tinfo); }
    
    var layer = stack[i];
    if (!layer) {
      // if no transformers are registered (or they all pass), the default
      // behavior is to use the un-transformed info as-is
      return done(null, info);
    }
    
    
    function transformed(e, t) {
      pass(i + 1, e, t);
    }
    
    try {
      var arity = layer.length;
      if (arity == 1) {
        // sync
        var t = layer(info);
        transformed(null, t);
      } else if (arity == 3) {
        layer(req, info, transformed);
      } else {
        layer(info, transformed);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Return strategy with given `name`. 
 *
 * @param {String} name
 * @return {Strategy}
 * @api private
 */
Authenticator.prototype._strategy = function(name) {
  return this._strategies[name];
};


/**
 * Expose `Authenticator`.
 */
module.exports = Authenticator;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * `AuthenticationError` error.
 *
 * @api private
 */
function AuthenticationError(message, status) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticationError';
  this.message = message;
  this.status = status || 401;
}

/**
 * Inherit from `Error`.
 */
AuthenticationError.prototype.__proto__ = Error.prototype;


/**
 * Expose `AuthenticationError`.
 */
module.exports = AuthenticationError;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Passport = __webpack_require__(26)
  , SessionStrategy = __webpack_require__(23);


/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = new Passport();

/**
 * Expose constructors.
 */
exports.Passport =
exports.Authenticator = Passport;
exports.Strategy = __webpack_require__(20);

/**
 * Expose strategies.
 */
exports.strategies = {};
exports.strategies.SessionStrategy = SessionStrategy;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var http = __webpack_require__(24)
  , IncomingMessageExt = __webpack_require__(22)
  , AuthenticationError = __webpack_require__(27);


/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * Options:
 *   - `session`          Save login state in session, defaults to _true_
 *   - `successRedirect`  After successful login, redirect to given URL
 *   - `failureRedirect`  After failed login, redirect to given URL
 *   - `assignProperty`   Assign the object provided by the verify callback to given property
 *
 * An optional `callback` can be supplied to allow the application to overrride
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 *
 * @param {String|Array} name
 * @param {Object} options
 * @param {Function} callback
 * @return {Function}
 * @api public
 */
module.exports = function authenticate(passport, name, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  
  var multi = true;
  
  // Cast `name` to an array, allowing authentication to pass through a chain of
  // strategies.  The first strategy to succeed, redirect, or error will halt
  // the chain.  Authentication failures will proceed through each strategy in
  // series, ultimately failing if all strategies fail.
  //
  // This is typically used on API endpoints to allow clients to authenticate
  // using their preferred choice of Basic, Digest, token-based schemes, etc.
  // It is not feasible to construct a chain of multiple strategies that involve
  // redirection (for example both Facebook and Twitter), since the first one to
  // redirect will halt the chain.
  if (!Array.isArray(name)) {
    name = [ name ];
    multi = false;
  }
  
  return function authenticate(req, res, next) {
    if (http.IncomingMessage.prototype.logIn
        && http.IncomingMessage.prototype.logIn !== IncomingMessageExt.logIn) {
      __webpack_require__(21).__monkeypatchNode();
    }
    
    
    // accumulator for failures from each strategy in the chain
    var failures = [];
    
    function allFailed() {
      if (callback) {
        if (!multi) {
          return callback(null, false, failures[0].challenge, failures[0].status);
        } else {
          var challenges = failures.map(function(f) { return f.challenge; });
          var statuses = failures.map(function(f) { return f.status; });
          return callback(null, false, challenges, statuses);
        }
      }
      
      // Strategies are ordered by priority.  For the purpose of flashing a
      // message, the first failure will be displayed.
      var failure = failures[0] || {}
        , challenge = failure.challenge || {}
        , msg;
    
      if (options.failureFlash) {
        var flash = options.failureFlash;
        if (typeof flash == 'string') {
          flash = { type: 'error', message: flash };
        }
        flash.type = flash.type || 'error';
      
        var type = flash.type || challenge.type || 'error';
        msg = flash.message || challenge.message || challenge;
        if (typeof msg == 'string') {
          req.flash(type, msg);
        }
      }
      if (options.failureMessage) {
        msg = options.failureMessage;
        if (typeof msg == 'boolean') {
          msg = challenge.message || challenge;
        }
        if (typeof msg == 'string') {
          req.session.messages = req.session.messages || [];
          req.session.messages.push(msg);
        }
      }
      if (options.failureRedirect) {
        return res.redirect(options.failureRedirect);
      }
    
      // When failure handling is not delegated to the application, the default
      // is to respond with 401 Unauthorized.  Note that the WWW-Authenticate
      // header will be set according to the strategies in use (see
      // actions#fail).  If multiple strategies failed, each of their challenges
      // will be included in the response.
      var rchallenge = []
        , rstatus, status;
      
      for (var j = 0, len = failures.length; j < len; j++) {
        failure = failures[j];
        challenge = failure.challenge;
        status = failure.status;
          
        rstatus = rstatus || status;
        if (typeof challenge == 'string') {
          rchallenge.push(challenge);
        }
      }
    
      res.statusCode = rstatus || 401;
      if (res.statusCode == 401 && rchallenge.length) {
        res.setHeader('WWW-Authenticate', rchallenge);
      }
      if (options.failWithError) {
        return next(new AuthenticationError(http.STATUS_CODES[res.statusCode], rstatus));
      }
      res.end(http.STATUS_CODES[res.statusCode]);
    }
    
    (function attempt(i) {
      var layer = name[i];
      // If no more strategies exist in the chain, authentication has failed.
      if (!layer) { return allFailed(); }
    
      // Get the strategy, which will be used as prototype from which to create
      // a new instance.  Action functions will then be bound to the strategy
      // within the context of the HTTP request/response pair.
      var prototype = passport._strategy(layer);
      if (!prototype) { return next(new Error('Unknown authentication strategy "' + layer + '"')); }
    
      var strategy = Object.create(prototype);
      
      
      // ----- BEGIN STRATEGY AUGMENTATION -----
      // Augment the new strategy instance with action functions.  These action
      // functions are bound via closure the the request/response pair.  The end
      // goal of the strategy is to invoke *one* of these action methods, in
      // order to indicate successful or failed authentication, redirect to a
      // third-party identity provider, etc.
      
      /**
       * Authenticate `user`, with optional `info`.
       *
       * Strategies should call this function to successfully authenticate a
       * user.  `user` should be an object supplied by the application after it
       * has been given an opportunity to verify credentials.  `info` is an
       * optional argument containing additional user information.  This is
       * useful for third-party authentication strategies to pass profile
       * details.
       *
       * @param {Object} user
       * @param {Object} info
       * @api public
       */
      strategy.success = function(user, info) {
        if (callback) {
          return callback(null, user, info);
        }
      
        info = info || {};
        var msg;
      
        if (options.successFlash) {
          var flash = options.successFlash;
          if (typeof flash == 'string') {
            flash = { type: 'success', message: flash };
          }
          flash.type = flash.type || 'success';
        
          var type = flash.type || info.type || 'success';
          msg = flash.message || info.message || info;
          if (typeof msg == 'string') {
            req.flash(type, msg);
          }
        }
        if (options.successMessage) {
          msg = options.successMessage;
          if (typeof msg == 'boolean') {
            msg = info.message || info;
          }
          if (typeof msg == 'string') {
            req.session.messages = req.session.messages || [];
            req.session.messages.push(msg);
          }
        }
        if (options.assignProperty) {
          req[options.assignProperty] = user;
          return next();
        }
      
        req.logIn(user, options, function(err) {
          if (err) { return next(err); }
          
          function complete() {
            if (options.successReturnToOrRedirect) {
              var url = options.successReturnToOrRedirect;
              if (req.session && req.session.returnTo) {
                url = req.session.returnTo;
                delete req.session.returnTo;
              }
              return res.redirect(url);
            }
            if (options.successRedirect) {
              return res.redirect(options.successRedirect);
            }
            next();
          }
          
          if (options.authInfo !== false) {
            passport.transformAuthInfo(info, req, function(err, tinfo) {
              if (err) { return next(err); }
              req.authInfo = tinfo;
              complete();
            });
          } else {
            complete();
          }
        });
      };
      
      /**
       * Fail authentication, with optional `challenge` and `status`, defaulting
       * to 401.
       *
       * Strategies should call this function to fail an authentication attempt.
       *
       * @param {String} challenge
       * @param {Number} status
       * @api public
       */
      strategy.fail = function(challenge, status) {
        if (typeof challenge == 'number') {
          status = challenge;
          challenge = undefined;
        }
        
        // push this failure into the accumulator and attempt authentication
        // using the next strategy
        failures.push({ challenge: challenge, status: status });
        attempt(i + 1);
      };
      
      /**
       * Redirect to `url` with optional `status`, defaulting to 302.
       *
       * Strategies should call this function to redirect the user (via their
       * user agent) to a third-party website for authentication.
       *
       * @param {String} url
       * @param {Number} status
       * @api public
       */
      strategy.redirect = function(url, status) {
        // NOTE: Do not use `res.redirect` from Express, because it can't decide
        //       what it wants.
        //
        //       Express 2.x: res.redirect(url, status)
        //       Express 3.x: res.redirect(status, url) -OR- res.redirect(url, status)
        //         - as of 3.14.0, deprecated warnings are issued if res.redirect(url, status)
        //           is used
        //       Express 4.x: res.redirect(status, url)
        //         - all versions (as of 4.8.7) continue to accept res.redirect(url, status)
        //           but issue deprecated versions
        
        res.statusCode = status || 302;
        res.setHeader('Location', url);
        res.setHeader('Content-Length', '0');
        res.end();
      };
      
      /**
       * Pass without making a success or fail decision.
       *
       * Under most circumstances, Strategies should not need to call this
       * function.  It exists primarily to allow previous authentication state
       * to be restored, for example from an HTTP session.
       *
       * @api public
       */
      strategy.pass = function() {
        next();
      };
      
      /**
       * Internal error while performing authentication.
       *
       * Strategies should call this function when an internal error occurs
       * during the process of performing authentication; for example, if the
       * user directory is not available.
       *
       * @param {Error} err
       * @api public
       */
      strategy.error = function(err) {
        if (callback) {
          return callback(err);
        }
        
        next(err);
      };
      
      // ----- END STRATEGY AUGMENTATION -----
    
      strategy.authenticate(req, options);
    })(0); // attempt
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Passport initialization.
 *
 * Intializes Passport for incoming requests, allowing authentication strategies
 * to be applied.
 *
 * If sessions are being utilized, applications must set up Passport with
 * functions to serialize a user into and out of a session.  For example, a
 * common pattern is to serialize just the user ID into the session (due to the
 * fact that it is desirable to store the minimum amount of data in a session).
 * When a subsequent request arrives for the session, the full User object can
 * be loaded from the database by ID.
 *
 * Note that additional middleware is required to persist login state, so we
 * must use the `connect.session()` middleware _before_ `passport.initialize()`.
 *
 * If sessions are being used, this middleware must be in use by the
 * Connect/Express application for Passport to operate.  If the application is
 * entirely stateless (not using sessions), this middleware is not necessary,
 * but its use will not have any adverse impact.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @return {Function}
 * @api public
 */
module.exports = function initialize(passport) {
  
  return function initialize(req, res, next) {
    req._passport = {};
    req._passport.instance = passport;

    if (req.session && req.session[passport._key]) {
      // load data from existing session
      req._passport.session = req.session[passport._key];
    }

    next();
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {


module.exports = function(obj){
  var onData
    , onEnd
    , events = [];

  // buffer data
  obj.on('data', onData = function(data, encoding){
    events.push(['data', data, encoding]);
  });

  // buffer end
  obj.on('end', onEnd = function(data, encoding){
    events.push(['end', data, encoding]);
  });

  return {
    end: function(){
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    },
    resume: function(){
      this.end();
      for (var i = 0, len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(35);


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var passport = __webpack_require__(20)
  , util = __webpack_require__(32)
  , lookup = __webpack_require__(36).lookup;


/**
 * `Strategy` constructor.
 *
 * The local authentication strategy authenticates requests based on the
 * credentials submitted through an HTML-based login form.
 *
 * Applications must supply a `verify` callback which accepts `username` and
 * `password` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `usernameField`  field name where the username is found, defaults to _username_
 *   - `passwordField`  field name where the password is found, defaults to _password_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new LocalStrategy(
 *       function(username, password, done) {
 *         User.findOne({ username: username, password: password }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }
  
  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';
  
  passport.Strategy.call(this);
  this.name = 'local';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
  var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
  
  if (!username || !password) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }
  
  var self = this;
  
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, username, password, verified);
    } else {
      this._verify(username, password, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.lookup = function(obj, field) {
  if (!obj) { return null; }
  var chain = field.split(']').join('').split('[');
  for (var i = 0, len = chain.length; i < len; i++) {
    var prop = obj[chain[i]];
    if (typeof(prop) === 'undefined') { return null; }
    if (typeof(prop) !== 'object') { return prop; }
    obj = prop;
  }
  return null;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(28);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(34);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(67);

var _user = __webpack_require__(9);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(0);

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
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await _user2.default.FindById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(localStg);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(54).default;
module.exports.default = module.exports;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var JsonWebTokenError = function (message, error) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'JsonWebTokenError';
  this.message = message;
  if (error) this.inner = error;
};

JsonWebTokenError.prototype = Object.create(Error.prototype);
JsonWebTokenError.prototype.constructor = JsonWebTokenError;

module.exports = JsonWebTokenError;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/*global exports*/
var SignStream = __webpack_require__(63);
var VerifyStream = __webpack_require__(64);

var ALGORITHMS = [
  'HS256', 'HS384', 'HS512',
  'RS256', 'RS384', 'RS512',
  'ES256', 'ES384', 'ES512'
];

exports.ALGORITHMS = ALGORITHMS;
exports.sign = SignStream.sign;
exports.verify = VerifyStream.verify;
exports.decode = VerifyStream.decode;
exports.isValid = VerifyStream.isValid;
exports.createSign = function createSign(opts) {
  return new SignStream(opts);
};
exports.createVerify = function createVerify(opts) {
  return new VerifyStream(opts);
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("safe-buffer");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var jws = __webpack_require__(40);

module.exports = function (jwt, options) {
  options = options || {};
  var decoded = jws.decode(jwt, options);
  if (!decoded) { return null; }
  var payload = decoded.payload;

  //try parse the payload
  if(typeof payload === 'string') {
    try {
      var obj = JSON.parse(payload);
      if(typeof obj === 'object') {
        payload = obj;
      }
    } catch (e) { }
  }

  //return header if `complete` option is enabled.  header includes claims
  //such as `kid` and `alg` used to select the key within a JWKS needed to
  //verify the signature
  if (options.complete === true) {
    return {
      header: decoded.header,
      payload: payload,
      signature: decoded.signature
    };
  }
  return payload;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var JsonWebTokenError = __webpack_require__(39);

var NotBeforeError = function (message, date) {
  JsonWebTokenError.call(this, message);
  this.name = 'NotBeforeError';
  this.date = date;
};

NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);

NotBeforeError.prototype.constructor = NotBeforeError;

module.exports = NotBeforeError;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var JsonWebTokenError = __webpack_require__(39);

var TokenExpiredError = function (message, expiredAt) {
  JsonWebTokenError.call(this, message);
  this.name = 'TokenExpiredError';
  this.expiredAt = expiredAt;
};

TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);

TokenExpiredError.prototype.constructor = TokenExpiredError;

module.exports = TokenExpiredError;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var bufferEqual = __webpack_require__(56);
var base64url = __webpack_require__(38);
var Buffer = __webpack_require__(42).Buffer;
var crypto = __webpack_require__(19);
var formatEcdsa = __webpack_require__(57);
var util = __webpack_require__(32);

var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".'
var MSG_INVALID_SECRET = 'secret must be a string or buffer';
var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';

function typeError(template) {
  var args = [].slice.call(arguments, 1);
  var errMsg = util.format.bind(util, template).apply(null, args);
  return new TypeError(errMsg);
}

function bufferOrString(obj) {
  return Buffer.isBuffer(obj) || typeof obj === 'string';
}

function normalizeInput(thing) {
  if (!bufferOrString(thing))
    thing = JSON.stringify(thing);
  return thing;
}

function createHmacSigner(bits) {
  return function sign(thing, secret) {
    if (!bufferOrString(secret))
      throw typeError(MSG_INVALID_SECRET);
    thing = normalizeInput(thing);
    var hmac = crypto.createHmac('sha' + bits, secret);
    var sig = (hmac.update(thing), hmac.digest('base64'))
    return base64url.fromBase64(sig);
  }
}

function createHmacVerifier(bits) {
  return function verify(thing, signature, secret) {
    var computedSig = createHmacSigner(bits)(thing, secret);
    return bufferEqual(Buffer.from(signature), Buffer.from(computedSig));
  }
}

function createKeySigner(bits) {
 return function sign(thing, privateKey) {
    if (!bufferOrString(privateKey) && !(typeof privateKey === 'object'))
      throw typeError(MSG_INVALID_SIGNER_KEY);
    thing = normalizeInput(thing);
    // Even though we are specifying "RSA" here, this works with ECDSA
    // keys as well.
    var signer = crypto.createSign('RSA-SHA' + bits);
    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
    return base64url.fromBase64(sig);
  }
}

function createKeyVerifier(bits) {
  return function verify(thing, signature, publicKey) {
    if (!bufferOrString(publicKey))
      throw typeError(MSG_INVALID_VERIFIER_KEY);
    thing = normalizeInput(thing);
    signature = base64url.toBase64(signature);
    var verifier = crypto.createVerify('RSA-SHA' + bits);
    verifier.update(thing);
    return verifier.verify(publicKey, signature, 'base64');
  }
}

function createECDSASigner(bits) {
  var inner = createKeySigner(bits);
  return function sign() {
    var signature = inner.apply(null, arguments);
    signature = formatEcdsa.derToJose(signature, 'ES' + bits);
    return signature;
  };
}

function createECDSAVerifer(bits) {
  var inner = createKeyVerifier(bits);
  return function verify(thing, signature, publicKey) {
    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
    var result = inner(thing, signature, publicKey);
    return result;
  };
}

function createNoneSigner() {
  return function sign() {
    return '';
  }
}

function createNoneVerifier() {
  return function verify(thing, signature) {
    return signature === '';
  }
}

module.exports = function jwa(algorithm) {
  var signerFactories = {
    hs: createHmacSigner,
    rs: createKeySigner,
    es: createECDSASigner,
    none: createNoneSigner,
  }
  var verifierFactories = {
    hs: createHmacVerifier,
    rs: createKeyVerifier,
    es: createECDSAVerifer,
    none: createNoneVerifier,
  }
  var match = algorithm.match(/^(RS|ES|HS)(256|384|512)$|^(none)$/i);
  if (!match)
    throw typeError(MSG_INVALID_ALGORITHM, algorithm);
  var algo = (match[1] || match[3]).toLowerCase();
  var bits = match[2];

  return {
    sign: signerFactories[algo](bits),
    verify: verifierFactories[algo](bits),
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/*global module, process*/
var Buffer = __webpack_require__(42).Buffer;
var Stream = __webpack_require__(43);
var util = __webpack_require__(32);

function DataStream(data) {
  this.buffer = null;
  this.writable = true;
  this.readable = true;

  // No input
  if (!data) {
    this.buffer = Buffer.alloc(0);
    return this;
  }

  // Stream
  if (typeof data.pipe === 'function') {
    this.buffer = Buffer.alloc(0);
    data.pipe(this);
    return this;
  }

  // Buffer or String
  // or Object (assumedly a passworded key)
  if (data.length || typeof data === 'object') {
    this.buffer = data;
    this.writable = false;
    process.nextTick(function () {
      this.emit('end', data);
      this.readable = false;
      this.emit('close');
    }.bind(this));
    return this;
  }

  throw new TypeError('Unexpected data type ('+ typeof data + ')');
}
util.inherits(DataStream, Stream);

DataStream.prototype.write = function write(data) {
  this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);
  this.emit('data', data);
};

DataStream.prototype.end = function end(data) {
  if (data)
    this.write(data);
  this.emit('end', data);
  this.emit('close');
  this.writable = false;
  this.readable = false;
};

module.exports = DataStream;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/*global module*/
var Buffer = __webpack_require__(41).Buffer;

module.exports = function toString(obj) {
  if (typeof obj === 'string')
    return obj;
  if (typeof obj === 'number' || Buffer.isBuffer(obj))
    return obj.toString();
  return JSON.stringify(obj);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var re = /(\S+)\s+(\S+)/;



function parseAuthHeader(hdrValue) {
    if (typeof hdrValue !== 'string') {
        return null;
    }
    var matches = hdrValue.match(re);
    return matches && { scheme: matches[1], value: matches[2] };
}



module.exports = {
    parse: parseAuthHeader
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("xtend");

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pad_string_1 = __webpack_require__(55);
function encode(input, encoding) {
    if (encoding === void 0) { encoding = "utf8"; }
    if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
    }
    return fromBase64(new Buffer(input, encoding).toString("base64"));
}
;
function decode(base64url, encoding) {
    if (encoding === void 0) { encoding = "utf8"; }
    return new Buffer(toBase64(base64url), "base64").toString(encoding);
}
function toBase64(base64url) {
    base64url = base64url.toString();
    return pad_string_1.default(base64url)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
}
function fromBase64(base64) {
    return base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
function toBuffer(base64url) {
    return new Buffer(toBase64(base64url), "base64");
}
var base64url = encode;
base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.toBuffer = toBuffer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = base64url;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function padString(input) {
    var segmentLength = 4;
    var stringLength = input.length;
    var diff = stringLength % segmentLength;
    if (!diff) {
        return input;
    }
    var position = stringLength;
    var padLength = segmentLength - diff;
    var paddedStringLength = stringLength + padLength;
    var buffer = new Buffer(paddedStringLength);
    buffer.write(input);
    while (padLength--) {
        buffer.write("=", position++);
    }
    return buffer.toString();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = padString;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jshint node:true */

var Buffer = __webpack_require__(41).Buffer; // browserify
var SlowBuffer = __webpack_require__(41).SlowBuffer;

module.exports = bufferEq;

function bufferEq(a, b) {

  // shortcutting on type is necessary for correctness
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }

  // buffer sizes should be well-known information, so despite this
  // shortcutting, it doesn't leak any information about the *contents* of the
  // buffers.
  if (a.length !== b.length) {
    return false;
  }

  var c = 0;
  for (var i = 0; i < a.length; i++) {
    /*jshint bitwise:false */
    c |= a[i] ^ b[i]; // XOR
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
};

var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
  SlowBuffer.prototype.equal = origSlowBufEqual;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64Url = __webpack_require__(38).fromBase64;
var Buffer = __webpack_require__(42).Buffer;

var getParamBytesForAlg = __webpack_require__(58);

var MAX_OCTET = 0x80,
	CLASS_UNIVERSAL = 0,
	PRIMITIVE_BIT = 0x20,
	TAG_SEQ = 0x10,
	TAG_INT = 0x02,
	ENCODED_TAG_SEQ = (TAG_SEQ | PRIMITIVE_BIT) | (CLASS_UNIVERSAL << 6),
	ENCODED_TAG_INT = TAG_INT | (CLASS_UNIVERSAL << 6);

function signatureAsBuffer(signature) {
	if (Buffer.isBuffer(signature)) {
		return signature;
	} else if ('string' === typeof signature) {
		return Buffer.from(signature, 'base64');
	}

	throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
}

function derToJose(signature, alg) {
	signature = signatureAsBuffer(signature);
	var paramBytes = getParamBytesForAlg(alg);

	// the DER encoded param should at most be the param size, plus a padding
	// zero, since due to being a signed integer
	var maxEncodedParamLength = paramBytes + 1;

	var inputLength = signature.length;

	var offset = 0;
	if (signature[offset++] !== ENCODED_TAG_SEQ) {
		throw new Error('Could not find expected "seq"');
	}

	var seqLength = signature[offset++];
	if (seqLength === (MAX_OCTET | 1)) {
		seqLength = signature[offset++];
	}

	if (inputLength - offset < seqLength) {
		throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
	}

	if (signature[offset++] !== ENCODED_TAG_INT) {
		throw new Error('Could not find expected "int" for "r"');
	}

	var rLength = signature[offset++];

	if (inputLength - offset - 2 < rLength) {
		throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
	}

	if (maxEncodedParamLength < rLength) {
		throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
	}

	var rOffset = offset;
	offset += rLength;

	if (signature[offset++] !== ENCODED_TAG_INT) {
		throw new Error('Could not find expected "int" for "s"');
	}

	var sLength = signature[offset++];

	if (inputLength - offset !== sLength) {
		throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
	}

	if (maxEncodedParamLength < sLength) {
		throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
	}

	var sOffset = offset;
	offset += sLength;

	if (offset !== inputLength) {
		throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
	}

	var rPadding = paramBytes - rLength,
		sPadding = paramBytes - sLength;

	var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);

	for (offset = 0; offset < rPadding; ++offset) {
		dst[offset] = 0;
	}
	signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);

	offset = paramBytes;

	for (var o = offset; offset < o + sPadding; ++offset) {
		dst[offset] = 0;
	}
	signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);

	dst = dst.toString('base64');
	dst = base64Url(dst);

	return dst;
}

function countPadding(buf, start, stop) {
	var padding = 0;
	while (start + padding < stop && buf[start + padding] === 0) {
		++padding;
	}

	var needsSign = buf[start + padding] >= MAX_OCTET;
	if (needsSign) {
		--padding;
	}

	return padding;
}

function joseToDer(signature, alg) {
	signature = signatureAsBuffer(signature);
	var paramBytes = getParamBytesForAlg(alg);

	var signatureBytes = signature.length;
	if (signatureBytes !== paramBytes * 2) {
		throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
	}

	var rPadding = countPadding(signature, 0, paramBytes);
	var sPadding = countPadding(signature, paramBytes, signature.length);
	var rLength = paramBytes - rPadding;
	var sLength = paramBytes - sPadding;

	var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;

	var shortLength = rsBytes < MAX_OCTET;

	var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);

	var offset = 0;
	dst[offset++] = ENCODED_TAG_SEQ;
	if (shortLength) {
		// Bit 8 has value "0"
		// bits 7-1 give the length.
		dst[offset++] = rsBytes;
	} else {
		// Bit 8 of first octet has value "1"
		// bits 7-1 give the number of additional length octets.
		dst[offset++] = MAX_OCTET	| 1;
		// length, base 256
		dst[offset++] = rsBytes & 0xff;
	}
	dst[offset++] = ENCODED_TAG_INT;
	dst[offset++] = rLength;
	if (rPadding < 0) {
		dst[offset++] = 0;
		offset += signature.copy(dst, offset, 0, paramBytes);
	} else {
		offset += signature.copy(dst, offset, rPadding, paramBytes);
	}
	dst[offset++] = ENCODED_TAG_INT;
	dst[offset++] = sLength;
	if (sPadding < 0) {
		dst[offset++] = 0;
		signature.copy(dst, offset, paramBytes);
	} else {
		signature.copy(dst, offset, paramBytes + sPadding);
	}

	return dst;
}

module.exports = {
	derToJose: derToJose,
	joseToDer: joseToDer
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getParamSize(keySize) {
	var result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);
	return result;
}

var paramBytesForAlg = {
	ES256: getParamSize(256),
	ES384: getParamSize(384),
	ES512: getParamSize(521)
};

function getParamBytesForAlg(alg) {
	var paramBytes = paramBytesForAlg[alg];
	if (paramBytes) {
		return paramBytes;
	}

	throw new Error('Unknown algorithm "' + alg + '"');
}

module.exports = getParamBytesForAlg;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  decode: __webpack_require__(44),
  verify: __webpack_require__(62),
  sign: __webpack_require__(61),
  JsonWebTokenError: __webpack_require__(39),
  NotBeforeError: __webpack_require__(45),
  TokenExpiredError: __webpack_require__(46),
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ms = __webpack_require__(51);

module.exports = function (time, iat) {
  var timestamp = iat || Math.floor(Date.now() / 1000);

  if (typeof time === 'string') {
    var milliseconds = ms(time);
    if (typeof milliseconds === 'undefined') {
      return;
    }
    return Math.floor(timestamp + milliseconds / 1000);
  } else if (typeof time === 'number') {
    return timestamp + time;
  } else {
    return;
  }

};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var Joi = __webpack_require__(15);
var timespan = __webpack_require__(60);
var xtend = __webpack_require__(53);
var jws = __webpack_require__(40);
var once = __webpack_require__(65);

var sign_options_schema = Joi.object().keys({
  expiresIn: [Joi.number().integer(), Joi.string()],
  notBefore: [Joi.number().integer(), Joi.string()],
  audience: [Joi.string(), Joi.array()],
  algorithm: Joi.string().valid('RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none'),
  header: Joi.object(),
  encoding: Joi.string(),
  issuer: Joi.string(),
  subject: Joi.string(),
  jwtid: Joi.string(),
  noTimestamp: Joi.boolean(),
  keyid: Joi.string()
});

var registered_claims_schema = Joi.object().keys({
  iat: Joi.number(),
  exp: Joi.number(),
  nbf: Joi.number()
}).unknown();


var options_to_payload = {
  'audience': 'aud',
  'issuer': 'iss',
  'subject': 'sub',
  'jwtid': 'jti'
};

var options_for_objects = [
  'expiresIn',
  'notBefore',
  'noTimestamp',
  'audience',
  'issuer',
  'subject',
  'jwtid',
];

module.exports = function (payload, secretOrPrivateKey, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  var isObjectPayload = typeof payload === 'object' &&
                        !Buffer.isBuffer(payload);

  var header = xtend({
    alg: options.algorithm || 'HS256',
    typ: isObjectPayload ? 'JWT' : undefined,
    kid: options.keyid
  }, options.header);

  function failure(err) {
    if (callback) {
      return callback(err);
    }
    throw err;
  }


  if (typeof payload === 'undefined') {
    return failure(new Error('payload is required'));
  } else if (isObjectPayload) {
    var payload_validation_result = registered_claims_schema.validate(payload);

    if (payload_validation_result.error) {
      return failure(payload_validation_result.error);
    }

    payload = xtend(payload);
  } else {
    var invalid_options = options_for_objects.filter(function (opt) {
      return typeof options[opt] !== 'undefined';
    });

    if (invalid_options.length > 0) {
      return failure(new Error('invalid ' + invalid_options.join(',') + ' option for ' + (typeof payload ) + ' payload'));
    }
  }

  if (typeof payload.exp !== 'undefined' && typeof options.expiresIn !== 'undefined') {
    return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
  }

  if (typeof payload.nbf !== 'undefined' && typeof options.notBefore !== 'undefined') {
    return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
  }

  var validation_result = sign_options_schema.validate(options);

  if (validation_result.error) {
    return failure(validation_result.error);
  }

  var timestamp = payload.iat || Math.floor(Date.now() / 1000);

  if (!options.noTimestamp) {
    payload.iat = timestamp;
  } else {
    delete payload.iat;
  }

  if (typeof options.notBefore !== 'undefined') {
    payload.nbf = timespan(options.notBefore);
    if (typeof payload.nbf === 'undefined') {
      return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
  }

  if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
    payload.exp = timespan(options.expiresIn, timestamp);
    if (typeof payload.exp === 'undefined') {
      return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
  }

  Object.keys(options_to_payload).forEach(function (key) {
    var claim = options_to_payload[key];
    if (typeof options[key] !== 'undefined') {
      if (typeof payload[claim] !== 'undefined') {
        return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
      }
      payload[claim] = options[key];
    }
  });

  var encoding = options.encoding || 'utf8';

  if (typeof callback === 'function') {
    callback = callback && once(callback);

    jws.createSign({
      header: header,
      privateKey: secretOrPrivateKey,
      payload: payload,
      encoding: encoding
    }).once('error', callback)
      .once('done', function (signature) {
        callback(null, signature);
      });
  } else {
    return jws.sign({header: header, payload: payload, secret: secretOrPrivateKey, encoding: encoding});
  }
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var JsonWebTokenError = __webpack_require__(39);
var NotBeforeError    = __webpack_require__(45);
var TokenExpiredError = __webpack_require__(46);
var decode            = __webpack_require__(44);
var jws               = __webpack_require__(40);
var ms                = __webpack_require__(51);
var xtend             = __webpack_require__(53);

module.exports = function (jwtString, secretOrPublicKey, options, callback) {
  if ((typeof options === 'function') && !callback) {
    callback = options;
    options = {};
  }

  if (!options) {
    options = {};
  }

  //clone this object since we are going to mutate it.
  options = xtend(options);
  var done;

  if (callback) {
    done = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      return process.nextTick(function() {
        callback.apply(null, args);
      });
    };
  } else {
    done = function(err, data) {
      if (err) throw err;
      return data;
    };
  }

  if (options.clockTimestamp && typeof options.clockTimestamp !== 'number') {
    return done(new JsonWebTokenError('clockTimestamp must be a number'));
  }

  var clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);

  if (!jwtString){
    return done(new JsonWebTokenError('jwt must be provided'));
  }

  if (typeof jwtString !== 'string') {
    return done(new JsonWebTokenError('jwt must be a string'));
  }

  var parts = jwtString.split('.');

  if (parts.length !== 3){
    return done(new JsonWebTokenError('jwt malformed'));
  }

  var hasSignature = parts[2].trim() !== '';

  if (!hasSignature && secretOrPublicKey){
    return done(new JsonWebTokenError('jwt signature is required'));
  }

  if (hasSignature && !secretOrPublicKey) {
    return done(new JsonWebTokenError('secret or public key must be provided'));
  }

  if (!hasSignature && !options.algorithms) {
    options.algorithms = ['none'];
  }

  if (!options.algorithms) {
    options.algorithms = ~secretOrPublicKey.toString().indexOf('BEGIN CERTIFICATE') ||
                         ~secretOrPublicKey.toString().indexOf('BEGIN PUBLIC KEY') ?
                          [ 'RS256','RS384','RS512','ES256','ES384','ES512' ] :
                         ~secretOrPublicKey.toString().indexOf('BEGIN RSA PUBLIC KEY') ?
                          [ 'RS256','RS384','RS512' ] :
                          [ 'HS256','HS384','HS512' ];

  }

  var decodedToken;
  try {
    decodedToken = jws.decode(jwtString);
  } catch(err) {
    return done(err);
  }

  if (!decodedToken) {
    return done(new JsonWebTokenError('invalid token'));
  }

  var header = decodedToken.header;

  if (!~options.algorithms.indexOf(header.alg)) {
    return done(new JsonWebTokenError('invalid algorithm'));
  }

  var valid;

  try {
    valid = jws.verify(jwtString, header.alg, secretOrPublicKey);
  } catch (e) {
    return done(e);
  }

  if (!valid)
    return done(new JsonWebTokenError('invalid signature'));

  var payload;

  try {
    payload = decode(jwtString);
  } catch(err) {
    return done(err);
  }

  if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
    if (typeof payload.nbf !== 'number') {
      return done(new JsonWebTokenError('invalid nbf value'));
    }
    if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
      return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
    }
  }

  if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
    if (typeof payload.exp !== 'number') {
      return done(new JsonWebTokenError('invalid exp value'));
    }
    if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
      return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
    }
  }

  if (options.audience) {
    var audiences = Array.isArray(options.audience)? options.audience : [options.audience];
    var target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];

    var match = target.some(function(aud) { return audiences.indexOf(aud) != -1; });

    if (!match)
      return done(new JsonWebTokenError('jwt audience invalid. expected: ' + audiences.join(' or ')));
  }

  if (options.issuer) {
    var invalid_issuer =
        (typeof options.issuer === 'string' && payload.iss !== options.issuer) ||
        (Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1);

    if (invalid_issuer) {
      return done(new JsonWebTokenError('jwt issuer invalid. expected: ' + options.issuer));
    }
  }

  if (options.subject) {
    if (payload.sub !== options.subject) {
      return done(new JsonWebTokenError('jwt subject invalid. expected: ' + options.subject));
    }
  }

  if (options.jwtid) {
    if (payload.jti !== options.jwtid) {
      return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
    }
  }

  if (options.maxAge) {
    var maxAge = ms(options.maxAge);
    if (typeof payload.iat !== 'number') {
      return done(new JsonWebTokenError('iat required when maxAge is specified'));
    }
    // We have to compare against either options.clockTimestamp or the currentDate _with_ millis
    // to not change behaviour (version 7.2.1). Should be resolve somehow for next major.
    var nowOrClockTimestamp = ((options.clockTimestamp || 0) * 1000) || Date.now();
    if (nowOrClockTimestamp - (payload.iat * 1000) > maxAge + (options.clockTolerance || 0) * 1000) {
      return done(new TokenExpiredError('maxAge exceeded', new Date(payload.iat * 1000 + maxAge)));
    }
  }

  return done(null, payload);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/*global module*/
var base64url = __webpack_require__(38);
var DataStream = __webpack_require__(48);
var jwa = __webpack_require__(47);
var Stream = __webpack_require__(43);
var toString = __webpack_require__(49);
var util = __webpack_require__(32);

function jwsSecuredInput(header, payload, encoding) {
  encoding = encoding || 'utf8';
  var encodedHeader = base64url(toString(header), 'binary');
  var encodedPayload = base64url(toString(payload), encoding);
  return util.format('%s.%s', encodedHeader, encodedPayload);
}

function jwsSign(opts) {
  var header = opts.header;
  var payload = opts.payload;
  var secretOrKey = opts.secret || opts.privateKey;
  var encoding = opts.encoding;
  var algo = jwa(header.alg);
  var securedInput = jwsSecuredInput(header, payload, encoding);
  var signature = algo.sign(securedInput, secretOrKey);
  return util.format('%s.%s', securedInput, signature);
}

function SignStream(opts) {
  var secret = opts.secret||opts.privateKey||opts.key;
  var secretStream = new DataStream(secret);
  this.readable = true;
  this.header = opts.header;
  this.encoding = opts.encoding;
  this.secret = this.privateKey = this.key = secretStream;
  this.payload = new DataStream(opts.payload);
  this.secret.once('close', function () {
    if (!this.payload.writable && this.readable)
      this.sign();
  }.bind(this));

  this.payload.once('close', function () {
    if (!this.secret.writable && this.readable)
      this.sign();
  }.bind(this));
}
util.inherits(SignStream, Stream);

SignStream.prototype.sign = function sign() {
  try {
    var signature = jwsSign({
      header: this.header,
      payload: this.payload.buffer,
      secret: this.secret.buffer,
      encoding: this.encoding
    });
    this.emit('done', signature);
    this.emit('data', signature);
    this.emit('end');
    this.readable = false;
    return signature;
  } catch (e) {
    this.readable = false;
    this.emit('error', e);
    this.emit('close');
  }
};

SignStream.sign = jwsSign;

module.exports = SignStream;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/*global module*/
var base64url = __webpack_require__(38);
var DataStream = __webpack_require__(48);
var jwa = __webpack_require__(47);
var Stream = __webpack_require__(43);
var toString = __webpack_require__(49);
var util = __webpack_require__(32);
var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function safeJsonParse(thing) {
  if (isObject(thing))
    return thing;
  try { return JSON.parse(thing); }
  catch (e) { return undefined; }
}

function headerFromJWS(jwsSig) {
  var encodedHeader = jwsSig.split('.', 1)[0];
  return safeJsonParse(base64url.decode(encodedHeader, 'binary'));
}

function securedInputFromJWS(jwsSig) {
  return jwsSig.split('.', 2).join('.');
}

function signatureFromJWS(jwsSig) {
  return jwsSig.split('.')[2];
}

function payloadFromJWS(jwsSig, encoding) {
  encoding = encoding || 'utf8';
  var payload = jwsSig.split('.')[1];
  return base64url.decode(payload, encoding);
}

function isValidJws(string) {
  return JWS_REGEX.test(string) && !!headerFromJWS(string);
}

function jwsVerify(jwsSig, algorithm, secretOrKey) {
  if (!algorithm) {
    var err = new Error("Missing algorithm parameter for jws.verify");
    err.code = "MISSING_ALGORITHM";
    throw err;
  }
  jwsSig = toString(jwsSig);
  var signature = signatureFromJWS(jwsSig);
  var securedInput = securedInputFromJWS(jwsSig);
  var algo = jwa(algorithm);
  return algo.verify(securedInput, signature, secretOrKey);
}

function jwsDecode(jwsSig, opts) {
  opts = opts || {};
  jwsSig = toString(jwsSig);

  if (!isValidJws(jwsSig))
    return null;

  var header = headerFromJWS(jwsSig);

  if (!header)
    return null;

  var payload = payloadFromJWS(jwsSig);
  if (header.typ === 'JWT' || opts.json)
    payload = JSON.parse(payload, opts.encoding);

  return {
    header: header,
    payload: payload,
    signature: signatureFromJWS(jwsSig)
  };
}

function VerifyStream(opts) {
  opts = opts || {};
  var secretOrKey = opts.secret||opts.publicKey||opts.key;
  var secretStream = new DataStream(secretOrKey);
  this.readable = true;
  this.algorithm = opts.algorithm;
  this.encoding = opts.encoding;
  this.secret = this.publicKey = this.key = secretStream;
  this.signature = new DataStream(opts.signature);
  this.secret.once('close', function () {
    if (!this.signature.writable && this.readable)
      this.verify();
  }.bind(this));

  this.signature.once('close', function () {
    if (!this.secret.writable && this.readable)
      this.verify();
  }.bind(this));
}
util.inherits(VerifyStream, Stream);
VerifyStream.prototype.verify = function verify() {
  try {
    var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
    var obj = jwsDecode(this.signature.buffer, this.encoding);
    this.emit('done', valid, obj);
    this.emit('data', valid);
    this.emit('end');
    this.readable = false;
    return valid;
  } catch (e) {
    this.readable = false;
    this.emit('error', e);
    this.emit('close');
  }
};

VerifyStream.decode = jwsDecode;
VerifyStream.isValid = isValidJws;
VerifyStream.verify = jwsVerify;

module.exports = VerifyStream;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = once;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = __webpack_require__(52),
    auth_hdr = __webpack_require__(50);

// Note: express http converts all headers
// to lower case.
var AUTH_HEADER = "authorization",
    DEFAULT_AUTH_SCHEME = "JWT";


var extractors = {};


extractors.fromHeader = function (header_name) {
    return function (request) {
        var token = null;
        if (request.headers[header_name]) {
            token = request.headers[header_name];
        }
        return token;
    };
};



extractors.fromBodyField = function (field_name) {
    return function (request) {
        var token = null;
        if (request.body && Object.prototype.hasOwnProperty.call(request.body, field_name)) {
            token = request.body[field_name];
        }
        return token;
    };
};



extractors.fromUrlQueryParameter = function (param_name) {
    return function (request) {
        var token = null,
            parsed_url = url.parse(request.url, true);
        if (parsed_url.query && Object.prototype.hasOwnProperty.call(parsed_url.query, param_name)) {
            token = parsed_url.query[param_name];
        }
        return token;
    };
};



extractors.fromAuthHeaderWithScheme = function (auth_scheme) {
    return function (request) {

        var token = null;
        if (request.headers[AUTH_HEADER]) {
            var auth_params = auth_hdr.parse(request.headers[AUTH_HEADER]);
            if (auth_params && auth_scheme === auth_params.scheme) {
                token = auth_params.value;
            }
        }
        return token;
    };
};



extractors.fromAuthHeader = function () {
    return extractors.fromAuthHeaderWithScheme(DEFAULT_AUTH_SCHEME);
};


extractors.fromExtractors = function(extractors) {
    if (!Array.isArray(extractors)) {
        throw new TypeError('extractors.fromExtractors expects an array')
    }
    
    return function (request) {
        var token = null;
        var index = 0;
        while(!token && index < extractors.length) {
            token = extractors[index].call(this, request);
            index ++;
        }
        return token;
    }
};


/**
 * This extractor mimics the behavior of the v1.*.* extraction logic.
 *
 * This extractor exists only to provide an easy transition from the v1.*.* API to the v2.0.0
 * API.
 *
 * This extractor first checks the auth header, if it doesn't find a token there then it checks the 
 * specified body field and finally the url query parameters.
 * 
 * @param options
 *          authScheme: Expected scheme when JWT can be found in HTTP Authorize header. Default is JWT. 
 *          tokenBodyField: Field in request body containing token. Default is auth_token.
 *          tokenQueryParameterName: Query parameter name containing the token. Default is auth_token.
 */
extractors.versionOneCompatibility = function (options) {
    var authScheme = options.authScheme || DEFAULT_AUTH_SCHEME,
        bodyField = options.tokenBodyField || 'auth_token',
        queryParam = options.tokenQueryParameterName || 'auth_token';

    return function (request) {
        var authHeaderExtractor = extractors.fromAuthHeaderWithScheme(authScheme);
        var token =  authHeaderExtractor(request);
        
        if (!token) {
            var bodyExtractor = extractors.fromBodyField(bodyField);
            token = bodyExtractor(request);
        }

        if (!token) {
            var queryExtractor = extractors.fromUrlQueryParameter(queryParam);
            token = queryExtractor(request);
        }

        return token;
    };
}



/**
 * Export the Jwt extraction functions
 */
module.exports = extractors;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Strategy = __webpack_require__(68),
    ExtractJwt = __webpack_require__(66);


module.exports = {
    Strategy: Strategy,
    ExtractJwt : ExtractJwt
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(20)
    , auth_hdr = __webpack_require__(50)
    , util = __webpack_require__(32)
    , url = __webpack_require__(52);



/**
 * Strategy constructor
 *
 * @param options
 *          secretOrKey: (REQUIRED) String or buffer containing the secret or PEM-encoded public key
 *          jwtFromRequest: (REQUIRED) Function that accepts a reqeust as the only parameter and returns the either JWT as a string or null
 *          issuer: If defined issuer will be verified against this value
 *          audience: If defined audience will be verified against this value
 *          algorithms: List of strings with the names of the allowed algorithms. For instance, ["HS256", "HS384"].
 *          ignoreExpiration: if true do not validate the expiration of the token.
 *          passReqToCallback: If true the, the verify callback will be called with args (request, jwt_payload, done_callback).
 * @param verify - Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
 *                 (request, jwt_payload, done_callback) if true.
 */
function JwtStrategy(options, verify) {

    passport.Strategy.call(this);
    this.name = 'jwt';

    this._secretOrKey = options.secretOrKey;
    if (!this._secretOrKey) {
        throw new TypeError('JwtStrategy requires a secret or key');
    }

    this._verify = verify;
    if (!this._verify) {
        throw new TypeError('JwtStrategy requires a verify callback');
    }

    this._jwtFromRequest = options.jwtFromRequest;
    if (!this._jwtFromRequest) {
        throw new TypeError('JwtStrategy requires a function to retrieve jwt from requests (see option jwtFromRequest)');
    }

    this._passReqToCallback = options.passReqToCallback;
    this._verifOpts = {};

    if (options.issuer) {
        this._verifOpts.issuer = options.issuer;
    }

    if (options.audience) {
        this._verifOpts.audience = options.audience;
    }

    if (options.algorithms) {
        this._verifOpts.algorithms = options.algorithms;
    }

    if (options.ignoreExpiration != null) {
        this._verifOpts.ignoreExpiration = options.ignoreExpiration;
    }

};
util.inherits(JwtStrategy, passport.Strategy);



/**
 * Allow for injection of JWT Verifier.
 *
 * This improves testability by allowing tests to cleanly isolate failures in the JWT Verification
 * process from failures in the passport related mechanics of authentication.
 *
 * Note that this should only be replaced in tests.
 */
JwtStrategy.JwtVerifier = __webpack_require__(69);



/**
 * Authenticate request based on JWT obtained from header or post body
 */
JwtStrategy.prototype.authenticate = function(req, options) {
    var self = this;

    var token = self._jwtFromRequest(req);

    if (!token) {
        return self.fail(new Error("No auth token"));
    }

    // Verify the JWT
    JwtStrategy.JwtVerifier(token, this._secretOrKey, this._verifOpts, function(jwt_err, payload) {
        if (jwt_err) {
            return self.fail(jwt_err);
        } else {
            // Pass the parsed token to the user
            var verified = function(err, user, info) {
                if(err) {
                    return self.error(err);
                } else if (!user) {
                    return self.fail(info);
                } else {
                    return self.success(user, info);
                }
            };

            try {
                if (self._passReqToCallback) {
                    self._verify(req, payload, verified);
                } else {
                    self._verify(payload, verified);
                }
            } catch(ex) {
                self.error(ex);
            }
        }
    });
};



/**
 * Export the Jwt Strategy
 */
 module.exports = JwtStrategy;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var jwt = __webpack_require__(59);

module.exports  = function(token, secretOrKey, options, callback) { 
    return jwt.verify(token, secretOrKey, options, callback);
};


/***/ })
/******/ ]);