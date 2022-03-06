import {createApp} from 'vue'
import App from './App.vue'
import SlashLayer from '../src/index.ts';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

let app = createApp(App);
app.config.globalProperties.$systemName = '用户管理系统'
let config = {
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
app.use(ElementPlus)
app.use(SlashLayer,config)
app.mount('#app')
