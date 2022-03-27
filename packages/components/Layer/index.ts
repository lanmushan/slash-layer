import Layer from './ts/Layer';
import LayerUtil from "./ts/LayerUtil";
import {App, Plugin} from "vue";
import {LayerGlobalConfigure} from "./ts/LayerConfigureDefinition";
import UseCurrentInstance from './ts/UseCurrentInstance'

export const LayerPlugin: Plugin = {
    install: (app: App, config: LayerGlobalConfigure): void => {
        app.config.globalProperties.$layer = Layer.init(config, app);
    }
};
export {Layer, LayerUtil, UseCurrentInstance}
export default LayerPlugin