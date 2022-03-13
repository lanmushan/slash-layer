import {createRouter, createWebHashHistory, RouterOptions} from 'vue-router'
// import routes from "virtual:generated-pages"

export const routesArray = [
    {
        title: '快速开始',
        name: 'readme',
        path: '/readme',
        component: () => import(`~/doc/readme.md`),
    },
    {
        title: '按钮',
        name: 'Button',
        path: '/Button',
        component: () => import(`~/components/Button/doc/readme.md`),
    },
    {
        title: '全局配置',
        name: 'GlobalConfigurationDemo',
        path: '/GlobalConfigurationDemo',
        component: () => import(`~/components/Layer/doc/GlobalConfigurationDemo.md`),
    }

];
console.log(routesArray)
const routerConfig = {
    history: createWebHashHistory(),
    routes: routesArray,
    scrollBehavior(to: any, from: any) {
        if (to.path !== from.path) {
            return {top: 0};
        }
    },
};

const router = createRouter(routerConfig as RouterOptions);

export default router;