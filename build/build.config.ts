import {baseConfig} from '../vite.config';
import {defineConfig} from 'vite';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    ...baseConfig,
    build: {
        outDir: 'demo',
    }
});
