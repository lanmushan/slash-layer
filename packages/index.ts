import {App, Plugin} from 'vue';

import {ButtonPlugin} from './components/Button/install';
 import {LayerPlugin} from './components/Layer/install'
import {LoadingDirectivePlugin} from "~/directives/install";

const components = [
    ButtonPlugin,LayerPlugin,LoadingDirectivePlugin
]
const ComponentPlugin: Plugin = {
    install(app: App, options: any) {
        components.forEach((component) => {
            component.install?.(app, options);
        });
    },
};
export default ComponentPlugin


