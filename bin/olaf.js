#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _version = require('../lib/version');

var _version2 = _interopRequireDefault(_version);

var _init = require('../lib/init');

var _init2 = _interopRequireDefault(_init);

var _like = require('../lib/like');

var _like2 = _interopRequireDefault(_like);

var _communicate = require('../lib/communicate');

var _communicate2 = _interopRequireDefault(_communicate);

var _start = require('../lib/start');

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_commander2.default.option('-c, --communicate', '联系作者', _communicate2.default).option('-l, --like', '感觉不错，不妨支持一下', _like2.default).option('-v, --version', '当前olaf-cli的版本', _version2.default);

const validates = {
  projectName: _joi2.default.string().regex(/^[a-z0-9-]{3,48}$/),
  author: _joi2.default.string().regex(/^[a-zA-Z\s]{3,20}$/),
  description: _joi2.default.string().min(3).max(1024),
  type: _joi2.default.string(),
  useScene: _joi2.default.number().integer().min(1).max(3)
};
_commander2.default.command('init').alias('i').description('使用olaf(奥拉夫)新建您的项目').option('--project-name <project name>', '项目名称（如:nodejs-react-example-web）').option('--author <author>', '作者英文名(如:Gavin)').option('--description <description>', '项目描述').option('--type <type>', '使用场景').option('--useScene <useScene>', '核心框架').action((() => {
  var _ref = _asyncToGenerator(function* (option) {
    const config = {
      projectName: option.projectName || null,
      author: option.author || null,
      description: option.description || null,
      type: option.type || null,
      useScene: option.useScene || 0
    };
    const questions = [];
    if (_joi2.default.validate(config.projectName, validates.projectName).error !== null) {
      questions.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称(如:nodejs-react-example-web):',
        validate(input) {
          const done = this.async();
          if (_joi2.default.validate(input, validates.projectName).error !== null) {
            done('项目名称为3~48个字符，且只能是小写字母、数字、中横线');
            return;
          }
          _fs2.default.access(input, _fs2.default.constants.F_OK, err => {
            if (err) {
              done(null, true);
              return true;
            }
            done('该项目在当前目录已存在');
            return false;
          });
        }
      });
    }
    if (_joi2.default.validate(config.author, validates.author).error !== null) {
      questions.push({
        type: 'input',
        name: 'author',
        message: '请输入作者英文名(如:Gavin):',
        validate(input) {
          const done = this.async();
          if (_joi2.default.validate(input, validates.author).error !== null) {
            done('请输入正确的作者英文名(如:Gavin)');
            return;
          }
          done(null, true);
        }
      });
    }
    if (_joi2.default.validate(config.description, validates.description).error !== null) {
      questions.push({
        type: 'input',
        name: 'description',
        message: '请输入项目描述:',
        validate(input) {
          const done = this.async();
          if (_joi2.default.validate(input, validates.description).error !== null) {
            done('项目描述必须为3~1024个字');
            return;
          }
          done(null, true);
        }
      });
    }
    if (_joi2.default.validate(config.type, validates.type).error !== null) {
      questions.push({
        type: 'list',
        name: 'type',
        message: '请选择项目类型',
        choices: [{
          name: 'React',
          value: 'react'
        }]
      });
    }
    if (_joi2.default.validate(config.useScene, validates.useScene).error !== null) {
      questions.push({
        type: 'list',
        name: 'useScene',
        message: '请选择使用场景',
        choices: [{
          name: 'PC',
          value: 1
        }],
        when: function (answers) {
          if (answers.type === 'react') {
            return true;
          }
          return false;
        }
      });
    }
    _inquirer2.default.prompt(questions).then(function (answers) {
      (0, _init2.default)(Object.assign(config, answers));
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());
_commander2.default.command('start').alias('s').description('运行项目').action(() => {
  (0, _start2.default)();
});
_commander2.default.parse(process.argv);