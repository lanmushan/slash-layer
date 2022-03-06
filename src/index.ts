import Button from './components/Button.vue';
import SlashLayer from './ts/Layer';
import {App} from "vue";
import {LayerGlobalConfigure} from "@/ts/LayerConfigure";
// 所有组件列表
const components = [Button]
const plugin = {
    install: (app: App, config: LayerGlobalConfigure): void => {
        app.config.globalProperties.$layer = new SlashLayer(config, app);
        components.forEach((component) => {
            app.component(component.name, component);
        });
    }
};
export default plugin