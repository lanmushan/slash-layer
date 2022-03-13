import {App, Plugin} from 'vue';
import {loadingDirective} from "~/directives/LoadingDirective.ts";

export const LoadingDirectivePlugin: Plugin = {
    install(app: App) {
        loadingDirective(app);
    },
};

