import {createApp} from 'vue'
import App from './App.vue'
import {SLashLayerPlugin} from '~';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {config} from './LayerConfig';

let app = createApp(App);
app.config.globalProperties.$systemName = '用户管理系统'

app.use(ElementPlus)
app.use(SLashLayerPlugin, config)

app.mount('#app')
