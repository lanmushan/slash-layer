import {App, Plugin} from 'vue';

import {ButtonPlugin} from './components/Button';
import {LayerPlugin} from './components/Layer'
import {LoadingDirectivePlugin} from "~/directives/";
export * from './components'

const components = [
    ButtonPlugin, LayerPlugin, LoadingDirectivePlugin
]

const ComponentPlugin: Plugin = {
    install(app: App, options: any) {
        components.forEach((component) => {
            component.install?.(app, options);
        });
    },
};
export default ComponentPlugin


