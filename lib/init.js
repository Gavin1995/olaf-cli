'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let createProject = (() => {
  var _ref = _asyncToGenerator(function* (data) {
    const { projectName, type, useScene } = data;
    const completePath = process.cwd();
    if (_path2.default.basename(completePath) === projectName) {
      // 上一级目录为当前项目名
    }

    if (_path2.default.basename(completePath) !== projectName) {
      if (type === 'react' && useScene === 1) {
        // pc
        yield _execa2.default.shell(`git clone git@github.com:Gavin1995/olaf-react-next-pc.git ${projectName}`);
        yield _execa2.default.shell(`rm -rf ${projectName}/.git`);
      }
    }
  });

  return function createProject(_x) {
    return _ref.apply(this, arguments);
  };
})();

let modify = (() => {
  var _ref2 = _asyncToGenerator(function* (projectName, author, description) {
    yield _execa2.default.shell(`grep olaf-react-next-pc -rl ${projectName} | xargs sed -i "" "s/olaf-react-next-pc/${projectName}/g"`);
    yield _execa2.default.shell(`grep olaf-template-author -rl ${projectName} | xargs sed -i "" "s/olaf-template-author/${author}/g"`);
    yield _execa2.default.shell(`grep olaf-template-description -rl ${projectName} | xargs sed -i "" "s/olaf-template-description/${description}/g"`);
  });

  return function modify(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = function (data) {
  createProject(data).then(() => {
    modify(data.projectName, data.author, data.description);
  });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }