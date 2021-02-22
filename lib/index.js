'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _default;

function _react() {
  const data = _interopRequireDefault(require('react'));

  _react = function _react() {
    return data;
  };

  return data;
}

function _localtunnel() {
  const data = _interopRequireDefault(require('localtunnel'));

  _localtunnel = function _localtunnel() {
    return data;
  };

  return data;
}

function _os() {
  const data = _interopRequireDefault(require('os'));

  _os = function _os() {
    return data;
  };

  return data;
}

function _crypto() {
  const data = _interopRequireDefault(require('crypto'));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

const KEY = 'localtunnel';

function _default(api) {
  api.logger.debug('use plugin: umi-plugin-localtunnel');
  api.describe({
    key: KEY,
    config: {
      default: {
        host: 'https://tunnel.igame.163.com',
        subdomain: getSubdomain(),
      },

      schema(joi) {
        return joi.object({
          host: joi.string(),
          subdomain: joi.string(),
        });
      },
    },
  });
  api.onDevCompileDone(({ isFirstCompile }) => {
    if (isFirstCompile) {
      const port = api.getPort();
      const host = api.config[KEY].host;
      const subdomain = api.config[KEY].subdomain;
      api.logger.debug(`use localhost server: ${host}`);
      startTunnel(port, host, subdomain, api.logger).catch(reason =>
        api.logger.error(reason),
      );
    }
  });
}

function startTunnel(_x, _x2, _x3, _x4) {
  return _startTunnel.apply(this, arguments);
}

function _startTunnel() {
  _startTunnel = _asyncToGenerator(function*(port, host, subdomain, logger) {
    const tunnel = yield (0, _localtunnel().default)({
      port: port,
      host: host,
      subdomain: subdomain,
    });
    logger.info(`Tunnel is running on: ${tunnel.url}`);
    tunnel.on('close', () => {
      logger.info('Tunnel have closed');
    });
  });
  return _startTunnel.apply(this, arguments);
}

function getSubdomain() {
  return 'umi-' + getIdentityHash(__dirname);
}
/**
 * 计算本机唯一标识码，5天更新一次
 * @param path 项目路径
 * reference: https://g.hz.netease.com/NeteaseMusicUI/cello/cello-kit-mobile/blob/master/packages/lightning/src/lifecycle/dev.ts
 */

function getIdentityHash(path = '') {
  const info = JSON.stringify(_os().default.userInfo()) + path;
  const week = Math.floor(new Date().getTime() / 432000000);

  const hash = _crypto().default.createHash('sha256');

  return hash
    .update(info + week)
    .digest('hex')
    .substr(5, 5);
}
