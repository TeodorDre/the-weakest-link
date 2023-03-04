import { version } from './../../../package.json';
import isDev from './is-dev';

const APP_VERSION = (() => {
  if (isDev) {
    return `${version}-dev`;
  }

  return `${version}-prod`;
})();

export default APP_VERSION;
