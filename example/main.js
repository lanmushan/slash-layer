import {createApp} from 'vue'
import App from './App.vue'
import SlashLayer from '../src/index.ts';
import {LayerConfigure} from "../src/ts/LayerConfigure";

let app = createApp(App);
app.config.globalProperties.$systemName = '用户管理系统'
let config = {
    name: "测试"
}

app.config.globalProperties.$layer = new SlashLayer(config);
app.mount('#app')
