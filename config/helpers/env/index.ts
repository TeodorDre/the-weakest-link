import appVersion from './app-version';
import isDev from './is-dev';
import outputPath from './output-path';
import port from './port';
import publicPath from './public-path';

export const EnvironmentVariable = {
  PORT: port,
  APP_VERSION: appVersion,
  OUTPUT_PATH: outputPath,
  PUBLIC_PATH: publicPath,
  IS_DEV: isDev,
};
