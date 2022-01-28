import Button from './components/Button.vue';
// @ts-ignore
import layer from './ts/layer.ts';

import {App} from "vue";
// 所有组件列表
const components = [Button,layer]
// 定义 install 方法， App 作为参数
const install = function (app:App) {
    components.forEach((component) => {
        app.component(component.name, component);
    });
};
export {
    Button,
}

export default layer