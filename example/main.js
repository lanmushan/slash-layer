import {createApp} from 'vue'
import App from './App.vue'
import SlashLayer from '../src/index.ts';
import {LayerConfigure} from "../src/ts/LayerConfigure";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {SuccessDecideResult} from "../src/ts/LayerConfigure";

let app = createApp(App);
app.config.globalProperties.$systemName = '用户管理系统'
let config = {
    name: "测试",
    successDecide(msg) {
        if (msg.code == 200) {
            return {
                msg: msg.msg, result: true, data: msg.data
            }
        } else {
            console.debug("失败");
            return {
                msg: msg.msg, result: false, data: msg.data
            }
        }
    }
}
app.use(ElementPlus,)

app.config.globalProperties.$layer = new SlashLayer(config, app);
app.mount('#app')
