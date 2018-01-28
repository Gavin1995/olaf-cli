'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  const qrStr = _colors2.default.yellow('🍺  使用【企业微信】扫描二维码联系作者【一石道长/张文】:');
  _qrcodeTerminal2.default.generate('https://work.weixin.qq.com/u/vcdec0c73ebdca8da1?v=2.1.2.991', function (qrcode) {
    console.log(`\n${qrStr}\n\n${qrcode}\n`);
  });
};

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _qrcodeTerminal = require('qrcode-terminal');

var _qrcodeTerminal2 = _interopRequireDefault(_qrcodeTerminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }