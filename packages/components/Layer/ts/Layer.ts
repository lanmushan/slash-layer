import {App, h, render} from "vue";
import {createVNode, defineComponent, ref} from 'vue'
import {Mount, unMount} from '../../../util/Mount'


import {
    LayerPosition,
    OpenConfigure,
    MessageConfigure,
    ConfirmConfigure,
    FormConfigure, SuccessDecideResult,
    LayerGlobalConfigure, OptionsContent, ImagesConfigure
} from "./LayerConfigureDefinition"
import Message from "~/components/LayerMessage/LayerMessage.vue"
import Welcome from "~/components/LayerWelcome/LayerWelcome.vue"
import LayerWrapper from "~/components/LayerWrapper/LayerWrapper.vue";
import Images from "~/components/LayerImages/LayerImages.vue";

import LayerUtil from "./LayerUtil";
import {createCommentVNode, createElementVNode} from "@vue/runtime-core";
// import {loadingDirective} from "@/directives/LoadingDirective";
import OpenConfigureUtil from "./OpenConfigureUtil"
import {defaultLayerGlobalConfigure, layer_id_prefix, layer_mask_prefix, layer_root_prefix} from "../consts/LayerConst";

let temp = null;
export default class Layer {
    static configure: LayerGlobalConfigure
    static wrapId: string = "slash_layer";
    elm: HTMLElement | null | undefined;
    static app: App | undefined

    public static init(config?: LayerGlobalConfigure, app?: App) {
        Layer.app = app;
        //loadingDirective(app);
        if (config == undefined) {
            Layer.configure = defaultLayerGlobalConfigure;
        } else {
            //合并内置配置
            let obj: LayerGlobalConfigure = LayerUtil.deepClone(config) as LayerGlobalConfigure;
            obj = LayerUtil.mergeJson(obj, defaultLayerGlobalConfigure) as LayerGlobalConfigure;
            obj.areaDef = LayerUtil.coverJson(defaultLayerGlobalConfigure.areaDef, config.areaDef)
            Layer.configure = obj;
            console.log("全量配置信息", obj);
        }
        return Layer;
    }


    /**
     * 模态框
     * @param config
     */
    public static modal(config: OpenConfigure): void {
        Layer.open(config);
    }

    public static confirm(config: ConfirmConfigure | string): Promise<any> {
        let _that = this;
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
            _that.open(openConfig);
        })
    }


    /**
     * 新增表单
     * @param config
     */
    public static createForm(config: FormConfigure): Promise<any> {
        let _that = this;
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
                                const result: SuccessDecideResult = this.configure.successDecide(msg);
                                this.autoInfo(result);
                                if (result.result) {
                                    Layer.close(instance.value.id);
                                }
                                resolve(result);
                            }).catch((msg: any) => {
                                if (msg) {
                                    const result: SuccessDecideResult = this.configure.successDecide(msg);
                                    this.autoInfo(result);
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
            _that.form(formConfig);
        })
    }

    public static autoInfo(msg: SuccessDecideResult): void {
        if (msg.result) {
            this.success(msg.msg);
        } else {
            this.error(msg.msg);
        }
    }

    /**
     * 新增表单
     * @param config
     */
    public static updateForm(config: FormConfigure): Promise<any> {
        let _that = this;
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
                                const result: SuccessDecideResult = this.configure.successDecide(msg);
                                this.autoInfo(result);
                                if (result.result) {
                                    Layer.close(instance.value.id);
                                }
                                resolve(result);
                            }).catch((msg: any) => {
                                if (msg) {
                                    const result: SuccessDecideResult = this.configure.successDecide(msg);
                                    this.autoInfo(result);
                                }
                                console.error("自动提交失败", msg);
                            }).finally(() => {
                                instance.value.cancelLoading();
                            });
                        }
                    }
                ]
            } as unknown as FormConfigure
            _that.form(formConfig);
        })
    }


    /**
     * 新增表单
     * @param config
     */
    public static readForm(config: FormConfigure): Promise<any> {
        let _that = this;
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
            _that.form(formConfig);
        })
    }


    public static form(config: FormConfigure): void {
        let formConfig = {
            title: config.title,
            max: true,
            min: true,
            footer: true,
            header: true,
            loadingTime: 200,
            autoCloseTime: 0,
            position: {
                width: 800,
                top: 80,
            },
            content: config.content,
        }
        let openConfig = LayerUtil.leftMergeJson(formConfig, config) as OpenConfigure;
        return this.open(openConfig);
    }

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
        this.message(conf);
    }

    public static info(config: MessageConfigure): void {
        let conf: any = {} as MessageConfigure;
        conf.iconColor = "#474444";
        conf.icon = "&#xe649;"
        if (typeof config === "string") {
            conf.msg = config;
        }
        if (typeof config === "object") {
            conf = LayerUtil.leftMergeJson(conf, config)
        }
        this.message(conf);
    }


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
            content: {
                component: Images,
                props: config
            }
        } as unknown as OpenConfigure
        this.open(openConfig);
    }

    public static message(config: MessageConfigure): void {
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
        this.open(openConfig);
    }

    static createHtmlDom(config: OpenConfigure): void {
        let rootDiv: HTMLElement = document.createElement("div");
        if (config.mask) {
            rootDiv.id = `${layer_root_prefix}${config.id}`
            rootDiv.className = "slash-layer-mask";
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
        const options: OpenConfigure = this.getOpenConfigure(config);
        if (typeof options.id === "undefined") {
            options.id = `${layer_id_prefix}_${LayerUtil.createId()}`;
        }
        console.log("弹框参数:", options);
        this.createHtmlDom(options);
        const elm: HTMLElement | null = document.getElementById(options.id);
        const {el, vNode} = Mount(LayerWrapper, {
            props: {
                options: options,
                class: options.theme
            }, app: this.app as any, elm: elm as any
        })
        temp = vNode;
        if (options.autoCloseTime && options.autoCloseTime > 0) {
            setTimeout(() => {
                Layer.close(options.id);
            }, options.autoCloseTime)
        }

    }

    public static closeAll() {
        let elms: NodeListOf<HTMLDivElement> = document.querySelectorAll(".slash-layer");
        if (elms) {
            elms.forEach(it => {
                Layer.close(it.id);
            })
        }
    }

    public static top(id: string | undefined): void {

        if (!id) {
            return;
        }
        let zIndex = LayerUtil.getMaxZIndex()
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

    public static close(id: string | undefined): void {
        if (!id) {
            return;
        }
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
                        app: this.app as any, elm: layer as any
                    })
                    layer.remove();
                }
                if (mask) {
                    mask.remove();
                }

            }, 500)
        }
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
        let currentConfig = Layer.copyOpenConfigure(openConfigure) as OpenConfigure;
        const defConfigure = typeof Layer.configure == "undefined" ? {} as LayerGlobalConfigure : Layer.configure;
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
        currentConfig.position = OpenConfigureUtil.getOpenPosition(currentConfig.position, this.configure);
        return currentConfig;
    }

    private getRelativePosition(position: LayerPosition): LayerPosition {
        if (position) {
            position.left = this.getRelativeLeft(position.width);
        }
        return position;
    }

    private getRelativeLeft(width: number): number {
        return LayerUtil.getViewPortWidth() / 2 - width / 2
    }
}

