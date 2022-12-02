import {App, reactive, ref} from "vue";
import {Mount, unMount} from '../../../util/Mount'


import {
    ConfirmConfigure,
    FormConfigure,
    ImagesConfigure,
    LayerCache,
    LayerGlobalConfigure,
    LayerPosition,
    MessageConfigure,
    OpenConfigure,
    OptionsContent,
    SelectFileConfig,
    SuccessDecideResult
} from "./LayerConfigureDefinition"
import Message from "~/components/LayerMessage/LayerMessage.vue"
import Welcome from "~/components/LayerWelcome/LayerWelcome.vue"
import LayerWelcome from "~/components/LayerWelcome/LayerWelcome.vue"
import LayerWrapper from "~/components/LayerWrapper/LayerWrapper.vue";
import Images from "~/components/LayerImages/LayerImages.vue";

import LayerUtil from "./LayerUtil";
import OpenConfigureUtil from "./OpenConfigureUtil"
import {defaultLayerGlobalConfigure, layer_id_prefix, layer_root_prefix} from "../consts/LayerConst";

export const layerConfig = ref<LayerGlobalConfigure>(
    reactive({
        ...defaultLayerGlobalConfigure
    })
);
const win = window as any;

export default class Layer {
    static layerCache: Map<string, LayerCache> = new Map<string, LayerCache>();

    public static initConfig(config: any) {
        //合并内置配置
        let obj: LayerGlobalConfigure = LayerUtil.deepClone(config) as LayerGlobalConfigure;
        win["layerConfig"] = LayerUtil.mergeJson(obj, defaultLayerGlobalConfigure) as LayerGlobalConfigure;
        win["layerConfig"].areaDef = LayerUtil.coverJson(defaultLayerGlobalConfigure.areaDef, config.areaDef)
        return obj;
    }

    public static init(config?: LayerGlobalConfigure, app?: App) {
        win["layerApp"] = app;
        console.log("初始化SlashLayer");
        //loadingDirective(app);
        if (config == undefined) {
            win["layerConfig"] = defaultLayerGlobalConfigure;
        } else {
            //合并内置配置
            let obj: LayerGlobalConfigure = LayerUtil.deepClone(config) as LayerGlobalConfigure;
            obj = LayerUtil.mergeJson(obj, defaultLayerGlobalConfigure) as LayerGlobalConfigure;
            obj.areaDef = LayerUtil.coverJson(defaultLayerGlobalConfigure.areaDef, config.areaDef)
            win["layerConfig"] = obj;
            console.log("全量配置信息", obj);
        }
        let timer: any | null = null;
        window.addEventListener('resize', function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer);
                }
                Layer.layoutModal();
            }, 200)

        })
        return Layer;
    }

    private static layoutModal(): void {
        const elms: HTMLCollectionOf<Element> = document.getElementsByClassName("slash-layer");
        if (!elms) {
            return;
        }
        for (let i = 0; i < elms.length; i++) {
            const elm: HTMLDivElement = elms[i] as HTMLDivElement;

            if (/slash-layer-swin/i.test(elm.className)) {
                let scaleX = 200 / elm.offsetWidth;
                elm.style.left = LayerUtil.getViewPortWidth() - elm.offsetWidth * scaleX + "px";
            } else {
                const width = elm.offsetLeft + elm.offsetWidth;
                const viewWidth = LayerUtil.getViewPortWidth();
                if (width > viewWidth) {
                    const left = elm.offsetLeft - (width - viewWidth);
                    elm.style.left = `${left > 0 ? left : 0}px`
                }
            }

        }
    }

    /**
     * 模态框
     * @param config
     */
    public static modal(config: OpenConfigure): void {
        Layer.open(config);
    }

    /**
     * 确认框
     * @param config
     */
    public static confirm(config: ConfirmConfigure | string): Promise<any> {
        let tempConfig: ConfirmConfigure | null = null;
        if (typeof config === "object") {
            tempConfig = config;
        } else if (config && typeof config === "string") {
            tempConfig = {} as ConfirmConfigure;
            tempConfig.msg = config;
        }
        if (tempConfig != null && !tempConfig.title) {
            tempConfig.title = "提示";
        }
        return new Promise(function (resolve, reject) {
            const openConfig = {
                title: tempConfig?.title,
                max: false,
                min: false,
                footer: true,
                header: true,
                autoCloseTime: 0,
                loadingTime: 0,
                mask: true,
                position: {
                    width: 300,
                    top: 80,
                    height: 130
                },
                content: {
                    component: Message,
                    props: tempConfig
                },
                closeCallBack: (id: string, data: any) => {
                    Layer.close(id);
                    reject(data);
                },
                btn: [
                    {
                        name: "取消",
                        className: "",
                        callback: (instance: any, data: any) => {
                            Layer.close(instance.value.id);
                            reject(data);
                        }

                    },
                    {
                        name: "确认",
                        className: "btn-primary",
                        callback: (instance: any, data: any) => {
                            Layer.close(instance.value.id);
                            resolve(data);
                        }
                    }]
            } as unknown as OpenConfigure
            Layer.open(openConfig);
        })
    }


    /**
     * 新增表单
     * @param config
     */
    public static createForm(config: FormConfigure): Promise<any> {
        return new Promise((resolve, reject) => {
            let formConfig = {
                ...config,
                runMode: 'create',
                closeCallBack(id?: string, data?: any): any {
                    reject(data);
                },
                btn: [
                    {
                        name: "取消",
                        className: "",
                        loading: true,
                        callback: (instance: any, data: any) => {
                            reject(data);
                            Layer.close(instance.value.id);
                        }
                    },
                    {
                        name: "提交",
                        className: "btn-primary",
                        loading: true,
                        loadingText: "正在提交中",
                        callback: (instance: any, data: any) => {
                            instance.value.doSubmit().then((msg: SuccessDecideResult) => {
                                if (msg == undefined) {
                                    return;
                                }
                                if (config.autoInfo) {
                                    const result: SuccessDecideResult = win["layerConfig"].successDecide(msg);
                                    if (result == undefined || result instanceof TypeError) {
                                        console.error("错误:", msg);
                                        return;
                                    }
                                    Layer.autoInfo(result);
                                    if (result.result) {
                                        Layer.close(instance.value.id);
                                    }
                                    resolve(result);
                                } else {
                                    resolve(msg);
                                    Layer.close(instance.value.id);
                                }
                            }).catch((msg: any) => {
                                if (msg == undefined || msg instanceof TypeError) {
                                    console.error("错误:", msg);
                                    return;
                                }
                                if (msg) {
                                    const result: SuccessDecideResult = win["layerConfig"].successDecide(msg);
                                    Layer.autoInfo(result);
                                    reject(result);
                                }
                                console.log("自动提交失败", msg);
                            }).finally(() => {
                                instance.value.cancelLoading();
                            });
                        }
                    }
                ]
            } as unknown as FormConfigure
            Layer.form(formConfig);
        })
    }

    /**
     * 自动提示
     * @param msg
     */
    public static autoInfo(msg: SuccessDecideResult): void {
        if (msg.result) {
            Layer.success(msg.msg);
        } else {
            Layer.error(msg.msg);
        }
    }

    /**
     * 更新表单
     * @param config
     */
    public static updateForm(config: FormConfigure): Promise<any> {
        return new Promise((resolve, reject) => {
            let formConfig = {
                ...config,
                runMode: 'update',
                closeCallBack(id?: string, data?: any): any {
                    reject(data);
                },
                btn: [
                    {
                        name: "取消",
                        className: "",
                        loading: true,
                        callback: (instance: any, data: any) => {
                            Layer.close(instance.value.id);
                            reject(data);
                        }
                    },
                    {
                        name: "保存",
                        className: "btn-primary",
                        loading: true,
                        loadingText: "正在修改中",
                        callback: (instance: any, data: any) => {
                            instance.value.doUpdate().then((msg: SuccessDecideResult) => {
                                if (msg == undefined) {
                                    return;
                                }
                                if (config.autoInfo) {
                                    const result: SuccessDecideResult = win["layerConfig"].successDecide(msg);
                                    if (result == undefined || result instanceof TypeError) {
                                        console.error("错误:", msg);
                                        return;
                                    }
                                    Layer.autoInfo(result);
                                    if (result.result) {
                                        Layer.close(instance.value.id);
                                    }
                                    resolve(result);
                                } else {
                                    resolve(msg);
                                    Layer.close(instance.value.id);
                                }
                            }).catch((msg: any) => {
                                if (msg == undefined || msg instanceof TypeError) {
                                    console.error("错误:", msg);
                                    return;
                                }
                                if (msg) {
                                    const result: SuccessDecideResult = win["layerConfig"].successDecide(msg);
                                    Layer.autoInfo(result);
                                }
                                console.error("自动提交失败", msg);
                            }).finally(() => {
                                instance.value.cancelLoading();
                            });
                        }
                    }
                ]
            } as unknown as FormConfigure
            Layer.form(formConfig);
        })
    }


    /**
     * 只读表单
     * @param config
     */
    public static readForm(config: FormConfigure): Promise<any> {
        return new Promise((resolve, reject) => {
            let formConfig = {
                ...config,
                runMode: 'read',
                closeCallBack(id?: string, data?: any): any {
                    reject(data);
                },
                btn: [
                    {
                        name: "确定",
                        className: "btn-primary",
                        loading: true,
                        loadingText: "正在修改中",
                        callback: (instance: any, data: any) => {
                            Layer.close(instance.value.id);
                        }
                    }
                ]
            } as unknown as FormConfigure
            Layer.form(formConfig);
        })
    }

    /**
     * form表单
     * @param config
     */
    public static form(config: FormConfigure): void {
        let formConfig = {
            title: config.title,
            loadingTime: 200,
            autoCloseTime: 0,
            position: {
                width: 800,
                top: 80,
            },
            content: config.content,
        }
        let openConfig = LayerUtil.leftMergeJson(formConfig, config) as OpenConfigure;
        return Layer.open(openConfig);
    }

    /**
     * 成功提示
     * @param config
     */
    public static success(config: MessageConfigure | string): void {
        let conf: any = {} as MessageConfigure;
        conf.iconColor = "#67c23a";
        conf.icon = "&#xe616;"
        if (typeof config === "string") {
            conf.msg = config;
        }
        if (typeof config === "object") {
            conf = LayerUtil.leftMergeJson(conf, config)
        }
        return Layer.message(conf);
    }

    /**
     * 错误提示
     * @param config
     */
    public static error(config: MessageConfigure | string): void {
        let conf: any = {} as MessageConfigure;
        conf.iconColor = "#ff0000";
        conf.icon = "&#xe633;"
        if (typeof config === "string") {
            conf.msg = config;
        }
        if (typeof config === "object") {
            conf = LayerUtil.leftMergeJson(conf, config)
        }
        Layer.message(conf);
    }

    public static info(config: MessageConfigure | string): void {
        let conf: any = {} as MessageConfigure;
        conf.iconColor = "#474444";
        conf.icon = "&#xe649;"
        if (typeof config === "string") {
            conf.msg = config;
        }
        if (typeof config === "object") {
            conf = LayerUtil.leftMergeJson(conf, config)
        }
        Layer.message(conf);
    }

    /**
     * 图片
     * @param config
     */
    public static images(config: ImagesConfigure): void {
        const openConfig = {
            title: "",
            max: false,
            min: false,
            footer: false,
            header: true,
            className: "layer-images",
            autoCloseTime: 0,
            loadingTime: 0,
            position: "full",
            mask: true,
            content: {
                component: Images,
                props: config
            }
        } as unknown as OpenConfigure
        Layer.open(openConfig);
    }

    /**
     * 提示
     * @param config
     */
    public static message(config: MessageConfigure): void {
        if (config == null || config == undefined || !config.msg) {
            console.error("无提示消息", config)
        }
        let width = config.msg.length * 25 > 200 ? config.msg.length * 20 : 200;
        const openConfig = {
            title: config.title,
            max: false,
            min: false,
            footer: false,
            header: false,
            className: "layer-msg",
            loadingTime: 0,
            autoCloseTime: 2000,
            position: {
                top: 40,
                width: width,
                height: 50
            },
            content: {
                component: Message,
                props: config
            }
        } as unknown as OpenConfigure
        Layer.open(openConfig);
    }

    static createHtmlDom(config: OpenConfigure): void {

        let rootDiv: HTMLElement = document.createElement("div");
        if (config.mask) {
            rootDiv.id = `${layer_root_prefix}${config.id}`
            rootDiv.className = "slash-layer-mask";
            rootDiv.style.zIndex = LayerUtil.getMaxZIndex() + 1 + "";
            const layerDiv = document.createElement("div");
            if (typeof config.id === "string") {
                layerDiv.id = config.id;
            }
            layerDiv.className = `slash-layer`;
            rootDiv.appendChild(layerDiv);

        } else {
            rootDiv = document.createElement("div");
            if (typeof config.id === "string") {
                rootDiv.id = config.id;
            }
            rootDiv.className = `slash-layer`;
        }

        document.body.appendChild(rootDiv);
    }

    public static open(config: OpenConfigure): void {
        const options: OpenConfigure = Layer.getOpenConfigure(config);
        if (typeof options.id === "undefined") {
            options.id = `${layer_id_prefix}_${LayerUtil.createId()}`;
        }
        if (typeof options.content === "undefined" || !options.content) {
            options.content = {} as OptionsContent;
        }
        if (!options.content.component) {
            options.content.component = LayerWelcome;
        }
        console.log("最终配置:", options);
        Layer.createHtmlDom(options);
        const elm: HTMLElement | null = document.getElementById(options.id);
        const {el, vNode} = Mount(LayerWrapper, {
            props: {
                options: options,
                class: options.theme
            }, app: win["layerApp"] as any, elm: elm as any
        })
        if (options.autoCloseTime && options.autoCloseTime > 0) {
            setTimeout(() => {
                Layer.close(options.id);
            }, options.autoCloseTime)
        }

    }

    /**
     * 关闭所有
     */
    public static closeAll() {
        let elms: NodeListOf<HTMLDivElement> = document.querySelectorAll(".slash-layer");
        if (elms) {
            elms.forEach(it => {
                Layer.close(it.id);
            })
        }
    }

    /**
     * 置顶
     * @param id
     */
    public static top(id: string | undefined): void {

        if (!id) {
            return;
        }
        let zIndex = LayerUtil.getMaxZIndex()
        console.log("当前index", zIndex);
        let elms: NodeListOf<HTMLDivElement> = document.querySelectorAll(".slash-layer");
        if (elms) {
            elms.forEach(it => {
                if (zIndex === parseInt(it.style.zIndex)) {
                    it.style.zIndex = `${zIndex - 1}`;
                }
            })
        }
        let elm = document.getElementById(id);
        if (elm) {
            elm["style"].zIndex = "" + zIndex;
        }
    }

    /**
     * 选择文件
     * @param p
     */
    public static async selectFile(p: SelectFileConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            let elm = document.createElement("input");
            elm.id = LayerUtil.createId();
            elm.type = "file";
            if (typeof p.accept != 'undefined') {
                elm.accept = p.accept.toString();
            }
            elm.multiple = true;
            document.getElementsByTagName('body')[0].appendChild(elm);
            elm.onchange = (evt) => {
                if (elm.files && elm.files.length > 0) {
                    resolve(elm.files);
                } else {
                    reject();
                }
                elm.remove();
            }
            elm.click();
        })

    }

    /**
     * 关闭
     * @param id
     */
    public static close(id: string | undefined): void {
        if (!id) {
            return;
        }
        Layer.layerCache.delete(id);
        const layer = document.getElementById(id);
        const mask = document.getElementById(`${layer_root_prefix}${id}`)
        if (mask) {
            mask.style.background = "transparent";
        }
        if (layer) {
            layer.classList.add("slash-top-fadeout");
            setTimeout(() => {
                if (layer) {
                    unMount(LayerWrapper, {
                        app: win["layerApp"] as any, elm: layer as any
                    })
                    layer.remove();
                }
                if (mask) {
                    mask.remove();
                }

            }, 500)
        }
    }

    /**
     * 切换大小
     * @param id
     */
    public static toggleSize(id: string) {
        const layerCache = Layer.layerCache.get(id);
        if (!layerCache) {
            Layer.max(id);
            return;
        }
        if (layerCache.full) {
            Layer.restoreSize(id);
        } else {
            Layer.max(id);
        }
    }

    /**
     * 重置大小
     * @param id
     */
    public static restoreSize(id: string) {
        const elm: HTMLElement | null = document.getElementById(id);
        const layerCache: LayerCache | undefined = Layer.layerCache.get(id);
        if (elm && layerCache) {
            Layer.position(id, layerCache.position);
            const footers: HTMLCollection | null = elm.getElementsByClassName("footer");
            if (footers && footers.length > 0) {
                const footer: HTMLElement = footers[0] as HTMLElement;
                footer['style'].position = ""
            }
        }
        if (layerCache) {
            layerCache.full = false;
            Layer.layerCache.set(id, layerCache);
        }
    }

    public static getOpenConfigure(openConfigure: OpenConfigure): OpenConfigure {
        console.log("当前配置", openConfigure);
        let currentConfig = LayerUtil.copyOpenConfigure(openConfigure) as OpenConfigure;

        const defConfigure = typeof win["layerConfig"] == "undefined" ? {} as LayerGlobalConfigure : win["layerConfig"];
        console.log("默认配置", defConfigure);
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
        currentConfig.position = OpenConfigureUtil.getOpenPosition(currentConfig.position, win["layerConfig"]);
        return currentConfig;
    }

    private getRelativePosition(position: LayerPosition): LayerPosition {
        if (position) {
            position.left = Layer.getRelativeLeft(position.width);
        }
        return position;
    }

    public static getRelativeLeft(width: number): number {
        return LayerUtil.getViewPortWidth() / 2 - width / 2
    }

    public static min(id: string): void {
        let elm = document.getElementById(id);
        if (!elm) {
            return;
        }
        const sWinPosition: LayerPosition = {} as LayerPosition;
        sWinPosition.left = elm.offsetLeft;
        sWinPosition.top = elm.offsetTop;
        sWinPosition.height = elm.offsetHeight;
        sWinPosition.width = elm.offsetWidth;
        let scaleX = 200 / elm.offsetWidth;
        let scaleY = 120 / elm.offsetHeight;
        elm.style.transform = `scale(${scaleX},${scaleY})`;
        elm.style.left = LayerUtil.getViewPortWidth() - elm.offsetWidth * scaleX + "px";

        let elms = document.querySelectorAll(".slash-layer-swin");
        let sumHeight = 0;
        if (elms) {
            for (let i = 0; i < elms.length; i++) {
                const elm = elms[i] as HTMLDivElement;
                let offsetHeight = elm.offsetHeight;
                let scale = 120 / offsetHeight;
                sumHeight += offsetHeight * scale + 10;
            }
        }
        elm.style.top = sumHeight + "px";
        elm.classList.add("slash-layer-swin");
        const childElm = elm.getElementsByClassName("s-win-flg")[0];
        childElm.classList.add("s-win");
        let cache: LayerCache | undefined = Layer.layerCache.get(id);
        if (cache) {
            cache.sWinPosition = sWinPosition;
        } else {
            cache = {} as LayerCache;
        }
        cache.sWinPosition = sWinPosition;
        Layer.layerCache.set(id, cache);
    }

    public static max(id: string): void {
        const elm: HTMLElement | null = document.getElementById(id);
        if (!elm) {
            return
        }
        const width = LayerUtil.getViewPortWidth();
        const height = LayerUtil.getViewPortHeight();
        const homePosition: LayerPosition = {} as LayerPosition;
        homePosition.left = elm.offsetLeft;
        homePosition.top = elm.offsetTop;
        homePosition.height = elm.offsetHeight;
        homePosition.width = elm.offsetWidth;
        const layerCacheInstance: LayerCache = {
            position: homePosition,
            full: false
        } as LayerCache;
        layerCacheInstance.full = true;
        Layer.layerCache.set(id, layerCacheInstance);
        elm.style.width = "100%";
        elm.style.height = height + 'px';
        elm.style.top = 0 + "px";
        elm.style.left = 0 + "px";
        const footers: HTMLCollection | null = elm.getElementsByClassName("footer");
        if (footers && footers.length > 0) {
            const footer: HTMLElement = footers[0] as HTMLElement;
            footer['style'].position = 'absolute'
        }

        console.log(Layer.layerCache);
    }

    public static normal(id: string): void {
        const layerIn = Layer.layerCache.get(id);
        if (!layerIn) {
            return;
        }
        const sWinHomePosition: LayerPosition = layerIn.sWinPosition;
        const elm: HTMLElement | null = document.getElementById(id);
        if (elm) {
            elm.style.transform = ``
            elm.classList.remove("slash-layer-swin");
            elm.style.width = sWinHomePosition.width + "px";
            elm.style.height = sWinHomePosition.height + "px";
            elm.style.top = sWinHomePosition.top + "px";
            elm.style.left = sWinHomePosition.left + "px";
            const childElm = elm.getElementsByClassName("s-win-flg")[0];
            if (childElm) {
                childElm.classList.remove("s-win");
            }
        }
        Layer.top(id);
        Layer.doRearrange();
        // Layer.layoutModal();
    }

    private static doRearrange() {
        const elms: HTMLCollection = document.getElementsByClassName("slash-layer-swin");
        if (elms) {
            let sumHeight = 0;
            for (let i = 0; i < elms.length; i++) {
                let elm = elms[i] as HTMLDivElement;
                let offsetHeight = elm.offsetHeight;
                let offsetWidth = elm.offsetWidth;
                let scaleY = 120 / offsetHeight;
                elm.style.top = sumHeight + "px";
                sumHeight += offsetHeight * scaleY + 10;
            }
        }
    }

    /**
     *
     * @param id
     * @param position
     */
    public static position(id: string, position: LayerPosition) {
        const elm: HTMLElement | null = document.getElementById(id);
        if (elm) {
            elm.style.width = position.width + "px";
            elm.style.height = position.height + "px";
            elm.style.top = position.top + "px";
            elm.style.left = position.left + "px";
        }
    }
}

