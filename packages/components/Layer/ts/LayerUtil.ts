import {defaultLayerGlobalConfigure, layer_id_prefix} from "../consts/LayerConst";
import {LayerGlobalConfigure, OpenConfigure, OptionsContent} from "~/components/Layer/ts/LayerConfigureDefinition";
import Welcome from "~/components/LayerWelcome/LayerWelcome.vue";
import OpenConfigureUtil from "~/components/Layer/ts/OpenConfigureUtil";
import {Layer} from "~";
import {layerConfig} from "~/components/Layer/ts/Layer";
const win = window as any;

export default class LayerUtil {
    static checkPromise(obj: any | Promise<object>) {
        return obj && obj["then"];
    }

    static getMaxZIndex(): number {
        let elms: NodeListOf<any> = document.querySelectorAll("*");
        // @ts-ignore
        let arr: number = [...elms].map(e => +window.getComputedStyle(e).zIndex || 0);
        // @ts-ignore
        return arr.length ? Math.max(...arr) : 0
    }

    static uuid(): string {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    static createId(): string {
        return layer_id_prefix + LayerUtil.uuid();
    }

    static getViewPortWidth(): number {
        return document.documentElement.clientWidth || document.body.offsetWidth || document.body.clientWidth;
    }

    static getViewPortHeight(): number {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    static getAbsolutePosition(reference: any, target: any): any {
        //因为我们会将目标元素的边框纳入递归公式中，这里先减去对应的值
        const result = {
            left: -target.clientLeft,
            top: -target.clientTop,
            right: 0,
            bottom: 0
        }
        let node = target;
        while (node != reference && node != document) {
            result.left = result.left + node.offsetLeft + node.clientLeft;
            result.top = result.top + node.offsetTop + node.clientTop;
            node = node.parentNode;
        }
        if (isNaN(reference.scrollLeft)) {
            result.right = document.documentElement.scrollWidth - result.left;
            result.bottom = document.documentElement.scrollHeight - result.top;
        } else {
            result.right = reference.scrollWidth - result.left;
            result.bottom = reference.scrollHeight - result.top;
        }
        return result;
    }

    /**
     * 合并Json
     * @param options
     * @param def
     */
    static mergeJson(options: any, def: any): Object {
        for (const key in def) {
            if (options[key] == undefined) {
                options[key] = def[key];
            }
        }
        return options;
    }

    static leftMergeJson(left: any, right: any): Object {
        for (const key in right) {
            if (right[key] != undefined) {
                left[key] = right[key];
            }
        }
        return left;
    }

    static coverJson(left: any, right: any) {
        for (const key in right) {
            left[key] = right[key];
        }
        return left;
    }

    public static copyOpenConfigure(openConfigure: OpenConfigure): OpenConfigure {
        let content = openConfigure.content;
        openConfigure.content = null;
        let currentConfig = JSON.parse(JSON.stringify(openConfigure)) as OpenConfigure;
        currentConfig.content = content;
        currentConfig.btn = openConfigure.btn;
        currentConfig.closeCallBack = openConfigure.closeCallBack;
        return currentConfig;
    }

    public static getOpenConfigure(openConfigure: OpenConfigure): OpenConfigure {
        let currentConfig = LayerUtil.copyOpenConfigure(openConfigure) as OpenConfigure;
        const defConfigure = typeof win["layerConfig"] == "undefined" ? {} as LayerGlobalConfigure : win["layerConfig"];
        if (!currentConfig.title) {
            currentConfig.title = defConfigure.title
        }
        if (typeof currentConfig.header === "undefined") {
            if (defConfigure.header) {
                currentConfig.header = defConfigure.header
            } else {
                currentConfig.header = false;
            }
        }
        if (typeof currentConfig.footer === "undefined") {
            currentConfig.footer = defConfigure.footer;
        }
        if (!currentConfig.title) {
            currentConfig.title = defConfigure.title
        }

        if (typeof currentConfig.max === 'undefined') {
            currentConfig.max = defConfigure.max;
        }
        if (typeof currentConfig.min === 'undefined') {
            currentConfig.min = defConfigure.min;
        }

        if (typeof currentConfig.autoCloseTime === 'undefined') {
            currentConfig.autoCloseTime = defConfigure.autoCloseTime
        }
        if (typeof currentConfig.loadingText === 'undefined') {
            if (defConfigure.loadingText) {
                currentConfig.loadingText = defConfigure.loadingText;
            } else {
                currentConfig.loadingText = "正在加载中";
            }
        }

        if (typeof currentConfig.loadingTime === 'undefined') {
            currentConfig.loadingTime = defConfigure.loadingTime
        }
        if (typeof currentConfig.content === 'undefined') {
            currentConfig.content = {
                component: Welcome
            } as OptionsContent
        }
        if (typeof currentConfig.theme === "undefined" && typeof defConfigure.theme != 'undefined') {
            currentConfig.theme = defConfigure.theme;
        }
        if (typeof currentConfig.dbFull === "undefined") {
            if (defConfigure.dbFull) {
                currentConfig.dbFull = defConfigure.dbFull;
            } else {
                currentConfig.dbFull = true;
            }
        }
        if (typeof currentConfig.allowMove === "undefined") {
            if (defConfigure.allowMove) {
                currentConfig.allowMove = defConfigure.allowMove;
            } else {
                currentConfig.allowMove = false;
            }
        }
        //处理坐标问题
        currentConfig.position = OpenConfigureUtil.getOpenPosition(currentConfig.position, win["layerConfig"] || defaultLayerGlobalConfigure);
        return currentConfig;
    }

    static deepClone(obj: any): Object {
        const result: any = typeof obj.splice === "function" ? [] : {};
        if (obj && typeof obj === 'object') {
            for (const key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    result[key] = LayerUtil.deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }
            }
            return result;
        }
        return obj;
    }
}
