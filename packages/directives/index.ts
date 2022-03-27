import {App, Plugin} from 'vue';
import {loadingDirective} from "./LoadingDirective";

export const LoadingDirectivePlugin: Plugin = {
    install(app: App) {
        loadingDirective(app);
    },
};

