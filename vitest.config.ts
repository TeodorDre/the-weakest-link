import * as path from 'path';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import { EnvironmentVariable } from './config/helpers/env';
import viteConfigBase from './config/vite.config.base';

const src = path.resolve(__dirname, 'src');

const isSSR = Boolean(process.env.SSR);

export default mergeConfig(viteConfigBase, defineConfig({
    base: EnvironmentVariable.OUTPUT_PATH,
    test: {
        globals: true,
        environment: isSSR ? 'node' : 'jsdom',
    },
    resolve: {
        alias: {
            '@': src,
        },
    },
    server: {
        port: EnvironmentVariable.PORT,
    },
    define: {
        'process.env.IS_TEST': JSON.stringify(true),
        'process.env.APP_VERSION': JSON.stringify(EnvironmentVariable.APP_VERSION),
    },
}));

