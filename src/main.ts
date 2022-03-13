import {createApp} from 'vue'
import App from './Doc.vue'
import SlashLayer from '~/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// @ts-ignore
import {config} from './LayerConfig';

let app = createApp(App);
app.config.globalProperties.$systemName = '用户管理系统'

app.use(ElementPlus)
app.use(SlashLayer, config)
app.mount('#app')
