import {App, Plugin} from 'vue';

import {ButtonPlugin} from './components/Button';
import {LayerPlugin} from './components/Layer'
export * from './components'

const components = [
    ButtonPlugin, LayerPlugin
]

export const SLashLayerPlugin: Plugin = {
    install(app: App, options: any) {
        components.forEach((component) => {
            component.install?.(app, options);
        });
    },
} as SLashLayerPlugin;
export default SLashLayerPlugin


