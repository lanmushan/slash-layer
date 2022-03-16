import {App, Plugin} from 'vue';

import {ButtonPlugin} from './components/Button/install';
import LayerInstall, {LayerPlugin} from './components/Layer/install'
import {LoadingDirectivePlugin} from "~/directives/install";

export const Layer={
    ...LayerInstall
}
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


