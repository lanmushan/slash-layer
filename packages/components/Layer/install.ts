import SlashLayer from './ts/Layer';
import {App, Plugin} from "vue";
import LayerConfigure, {LayerGlobalConfigure} from "./ts/LayerConfigureDefinition";

export const LayerPlugin: Plugin = {
    install: (app: App, config: LayerGlobalConfigure): void => {
        app.config.globalProperties.$layer = SlashLayer.init(config, app);
    }
};
export default {
    ...SlashLayer
}