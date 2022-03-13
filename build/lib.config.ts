import {baseConfig} from '../vite.config';
import {defineConfig} from 'vite';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    ...baseConfig,
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, '../packages/index.ts'),
            name: 'slash-layer',
            fileName: (format) => `slash-layer.${format}.js`,
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue',"element-plus"],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [
        ...((baseConfig as any).plugins),
        dts(),
    ]
});
