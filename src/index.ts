import Button from './components/Button.vue';
// @ts-ignore
import layer from './ts/Layer.ts';

import {App} from "vue";
// 所有组件列表
const components = [Button]
// 定义 install 方法， App 作为参数
const install = function (app:App) {
    console.log("注册")

    components.forEach((component) => {
        console.log("注册")
        app.component(component.name, component);
    });
};
export {
    Button,
}

export default layer