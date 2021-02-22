// ref:
// - https://umijs.org/plugins/api

import localtunnel from 'localtunnel';
import os from 'os';
import crypto from 'crypto';

const KEY = 'localtunnel';

export default function(api) {
  api.logger.debug('use plugin: umi-plugin-localtunnel');

  api.describe({
    key: KEY,
    config: {
      default: {
        host: 'https://localtunnel.me',
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

async function startTunnel(port, host, subdomain, logger) {
  const tunnel = await localtunnel({
    port: port,
    host: host,
    subdomain: subdomain,
  });

  logger.info(`Localtunnel is running on: ${tunnel.url}`);

  tunnel.on('close', () => {
    logger.info('Tunnel have closed');
  });
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
  const info = JSON.stringify(os.userInfo()) + path;
  const week = Math.floor(new Date().getTime() / 432000000);
  const hash = crypto.createHash('sha256');
  return hash
    .update(info + week)
    .digest('hex')
    .substr(5, 5);
}
