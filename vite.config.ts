import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


const {resolve} = require('path')

//https://cn.vitejs.dev/config/
export const baseConfig = defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@/*': resolve(__dirname, './src/*'),
            '~': resolve(__dirname, './packages'),
            '~/*': resolve(__dirname, './packages/*')
        },
    },
})
export default defineConfig(({command, mode}) => {
    console.log("当前命令:", command)
    console.log("当前模式:", mode)
    if (mode === 'serve') {
        console.log(command, mode)
        return {
            ...baseConfig
        }
    } else {
        // command === 'build'
        return {
            ...baseConfig
        }
    }
})
