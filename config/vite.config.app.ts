import path from 'path';
import {
  defineConfig, mergeConfig,
} from 'vite';

import root from './helpers/path/root';
import baseViteConfig from './vite.config.base';

export default mergeConfig(baseViteConfig, defineConfig({
  root: path.resolve(root, 'app'),
}));
