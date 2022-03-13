import {App, h, render} from "vue";
import {createVNode, defineComponent, ref} from 'vue'
import {Mount} from '../../../util/Mount'

import {createApp} from 'vue'

import {
    LayerConfigureDefinition,
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

class Layer {
    static configure: LayerGlobalConfigure
    static wrapId: string = "slash_layer";
    elm: HTMLElement | null | undefined;
    static app: App | undefined

    static init(config?: LayerGlobalConfigure, app?: App) {
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
    static modal(config: OpenConfigure): void {
        Layer.open(config);
    }


    /**
     * 新增表单
     * @param config
     */
    static createForm(config: FormConfigure): string | Promise<any> {
        let _that = this;
        return new Promise((resolve, reject) => {
            let formConfig = {
                ...config,
                runMode: 'create',
                btn: [
                    {
                        name: "取消",
                        className: "",
                        loading: true,
                        callback: (instance, data) => {
                            Layer.close(instance.value.id);
                        }
                    },
                    {
                        name: "提交",
                        className: "btn-primary",
                        loading: true,
                        loadingText: "正在提交中",
                        callback: (instance, data) => {
                            instance.value.doSubmit().then((msg: SuccessDecideResult) => {
                                const result: SuccessDecideResult = this.configure.successDecide(msg)
                                this.autoInfo(result);
                                if (result.result) {
                                    Layer.close(instance.value.id);
                                }
                                resolve(result.data);
                            }).catch((msg: any) => {
                                console.error("自动提交失败", msg);
                            }).finally(() => {
                                instance.value.cancelLoading();
                            })
                        }
                    }]
            } as FormConfigure
            Layer.form(formConfig);
        })
    }

    static autoInfo(msg: SuccessDecideResult): void {
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
    static updateForm(config: FormConfigure): string | Promise<any> {
        let _that = this;
        return new Promise((resolve, reject) => {
            let formConfig = {
                ...config,
                runMode: 'update',
                btn: [
                    {
                        name: "取消",
                        className: "",
                        loading: true,
                        callback: (instance, data) => {
                            Layer.close(instance.value.id);
                        }
                    },
                    {
                        name: "保存",
                        className: "btn-primary",
                        loading: true,
                        loadingText: "正在修改中",
                        callback: (instance, data) => {
                            instance.value.doUpdate().then((msg: SuccessDecideResult) => {
                                const result: SuccessDecideResult = this.configure.successDecide(msg)
                                this.autoInfo(result);
                                if (result.result) {
                                    Layer.close(instance.value.id);
                                }
                                resolve(result.data);
                            }).catch((msg: any) => {
                                console.error("自动提交失败", msg);
                            }).finally(() => {
                                instance.value.cancelLoading();
                            })
                        }
                    }]
            } as FormConfigure
            _that.form(formConfig);
        })
    }


    /**
     * 新增表单
     * @param config
     */
    static readForm(config: FormConfigure): string | Promise<any> {
        let _that = this;
        return new Promise((resolve, reject) => {
            let formConfig = {
                ...config,
                runMode: 'read',
                btn: [
                    {
                        name: "确定",
                        className: "btn-primary",
                        loading: true,
                        loadingText: "正在修改中",
                        callback: (instance, data) => {
                            Layer.close(instance.value.id);
                        }
                    }]
            } as FormConfigure
            _that.form(formConfig);
        })
    }


    static form(config: FormConfigure): string | void {
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
        this.open(openConfig);
    }

    static success(config: MessageConfigure | string): void {
        let conf: any = {} as MessageConfigure;
        conf.iconColor = "#67c23a";
        conf.icon = "&#xe616;"
        if (typeof config === "string") {
            conf.msg = config;
        }
        if (typeof config === "object") {
            conf = LayerUtil.leftMergeJson(conf, config)
        }
        return this.message(conf);
    }

    static error(config: MessageConfigure | string): void {
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

    static info(config: MessageConfigure): void {
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

    static confirm(config: ConfirmConfigure | string): Promise<any> {
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

    static images(config: ImagesConfigure): void {
        const openConfig = {
            title: "",
            max: false,
            min: false,
            footer: false,
            header: true,
            className: "layer-images",
            autoCloseTime: 0,
            loadingTime:0,
            position: "full",
            content: {
                component: Images,
                props: config
            }
        } as unknown as OpenConfigure
        this.open(openConfig);
    }

    static message(config: MessageConfigure): void {
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
            layerDiv.id = config.id;
            layerDiv.className = `slash-layer`;
            rootDiv.appendChild(layerDiv);

        } else {
            rootDiv = document.createElement("div");
            rootDiv.id = config.id;
            rootDiv.className = `slash-layer`;
        }

        document.body.appendChild(rootDiv);
    }

    static open(config: OpenConfigure): void {
        const options: OpenConfigure = this.getOpenConfigure(config);
        options.id = `${layer_id_prefix}_${LayerUtil.createId()}`;
        this.createHtmlDom(options);
        const elm: HTMLElement | null = document.getElementById(options.id);
        const {el, vNode} = Mount(LayerWrapper, {
            props: {
                options: options,
                class: options.theme
            }, app: this.app as any, elm: elm as any
        })
        if (options.autoCloseTime && options.autoCloseTime > 0) {
            setTimeout(() => {
                Layer.close(options.id);
            }, options.autoCloseTime)
        }

    }

    closeAll() {

    }

    static close(id: string): void {
        const layer = document.getElementById(id);
        const mask = document.getElementById(`${layer_root_prefix}${id}`)
        if (mask) {
            mask.style.background = "transparent";
        }
        if (layer) {
            layer.classList.add("slash-top-fadeout");
            setTimeout(() => {
                if (layer) {
                    layer.remove();
                }
                if (mask) {
                    mask.remove();
                }

            }, 500)
        }
    }

    private static copyOpenConfigure(openConfigure: OpenConfigure): OpenConfigure {
        let content = openConfigure.content;
        let currentConfig = JSON.parse(JSON.stringify(openConfigure)) as OpenConfigure;
        currentConfig.content = content;
        currentConfig.btn = openConfigure.btn;
        currentConfig.closeCallBack = openConfigure.closeCallBack;
        return currentConfig;
    }

    private static getOpenConfigure(openConfigure: OpenConfigure): OpenConfigure {
        let currentConfig = Layer.copyOpenConfigure(openConfigure) as OpenConfigure;
        const defConfigure = Layer.configure;
        if (!currentConfig.title) {
            currentConfig.title = defConfigure.title
        }
        if (typeof currentConfig.header === 'undefined') {
            currentConfig.header = defConfigure.header
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
        if (!currentConfig.footer) {
            currentConfig.footer = defConfigure.footer;
        }
        if (!currentConfig.autoCloseTime) {
            currentConfig.autoCloseTime = defConfigure.autoCloseTime
        }

        if (typeof currentConfig.loadingTime === 'undefined') {
            currentConfig.loadingTime = defConfigure.loadingTime
        }
        if (typeof currentConfig.content === 'undefined') {
            currentConfig.content = {
                component: Welcome
            } as OptionsContent
        }
        if (typeof currentConfig.theme === "undefined") {
            currentConfig.theme = this.configure.theme;
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

export default Layer