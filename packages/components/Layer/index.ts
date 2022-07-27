// @ts-ignore
// @ts-ignore

import Layer from './ts/Layer';
import LayerUtil from "./ts/LayerUtil";
import {App, Plugin} from "vue";
import {LayerGlobalConfigure} from "./ts/LayerConfigureDefinition";
import UseCurrentInstance from './ts/UseCurrentInstance'

export const LayerPlugin: Plugin = {
    install: (app: App, config: LayerGlobalConfigure): void => {
        console.log("安装slash-layer")
        if (app.config.globalProperties.$layer != undefined) {
            console.log("覆盖配置", config)
            console.log(app.config.globalProperties.$layer)
            app.config.globalProperties.$layer.initConfig(config);
        } else {
            console.log("初始化", config)
            app.config.globalProperties.$layer = Layer.init(config, app);

        }
    }
};
export  {Layer,LayerUtil,UseCurrentInstance}
export default LayerPlugin