import {App, h, render} from "vue";
import {createVNode, defineComponent, ref} from 'vue'
// @ts-ignore
import {Mount} from './Mount.ts'

import {createApp} from 'vue'

import LayerWrapper from "@/components/LayerWrapper.vue";
import {
    LayerConfigure,
    LayerPosition,
    OpenConfigure,
    MessageConfigure,
    ConfirmConfigure,
    FormConfigure, SuccessDecideResult
} from "@/ts/LayerConfigure"
import Message from "@/components/contents/Message.vue"
import LayerUtil from "@/ts/LayerUtil";
import {createCommentVNode, createElementVNode} from "@vue/runtime-core";
import {loadingDirective} from "@/directives/LoadingDirective";
import {layer_id_prefix, layer_mask_prefix} from "@/consts/LayerConst";

const defaultConfig: LayerConfigure = {
    title: "张三",
    max: true,
    min: true,
    loadingTime: 0,
    autoCloseTime: 0,
    successDecide: function (msg: object) {

    }
} as unknown as LayerConfigure;

class Layer {
    configure: LayerConfigure
    static wrapId: string = "slash_layer";
    elm: HTMLElement | null | undefined;
    app: App | undefined

    constructor(config?: LayerConfigure, app?: App) {
        this.app = app;
        loadingDirective(app);
        if (config == undefined) {
            this.configure = defaultConfig;
        } else {
            this.configure = LayerUtil.leftMergeJson(defaultConfig, config) as LayerConfigure;
        }
        console.log(this.configure.successDecide)
    }

    initDom(initClass:string|undefined): string {
        const id = LayerUtil.createId();
        const maskDiv: HTMLElement = document.createElement("div");
        maskDiv.className = "slash-layer-mask"
        maskDiv.id = `${layer_mask_prefix}_${id}`;
        const div = document.createElement("div");
        div.id = id;
        div.className = `slash-layer ${initClass?initClass:""}`;
        maskDiv.appendChild(div);
        document.body.appendChild(div);
        return id;

    }

    /**
     * 模态框
     * @param config
     */
    modal(config: OpenConfigure): void {

    }


    /**
     * 新增表单
     * @param config
     */
    createForm(config: FormConfigure): string | Promise<any> {
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
                            instance.value.doSubmit().then((msg) => {
                                const result: SuccessDecideResult = this.configure.successDecide(msg)
                                this.autoInfo(result);
                                if (result.result) {
                                    Layer.close(instance.value.id);
                                }
                                resolve(result.data);
                            }).catch(msg => {
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

    autoInfo(msg: SuccessDecideResult): void {
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
    updateForm(config: FormConfigure): string | Promise<any> {
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
                            instance.value.doSubmit().then((msg) => {
                                const result: SuccessDecideResult = this.configure.successDecide(msg)
                                this.autoInfo(result);
                                if (result.result) {
                                    Layer.close(instance.value.id);
                                }
                                resolve(result.data);
                            }).catch(msg => {
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
    readForm(config: FormConfigure): string | Promise<any> {
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


    form(config: FormConfigure): string | void {
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

    success(config: MessageConfigure | string): void {
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

    error(config: MessageConfigure | string): void {
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

    info(config: MessageConfigure): void {
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

    confirm(config: ConfirmConfigure): Promise<any> {
        let _that = this;
        // @ts-ignore
        return new Promise(function (resolve, reject) {
            const openConfig = {
                title: config.title,
                max: false,
                min: false,
                footer: true,
                header: true,
                autoCloseTime: 0,
                position: {
                    width: 300,
                    top: 120,
                },
                content: {
                    component: Message,
                    props: config
                },
                closeCallBack: (id: string, data: any) => {
                    Layer.close(id);
                    reject(data);
                },
                btn: [
                    {
                        name: "取消",
                        className: "",
                        callback: (data: any) => {
                            console.log("得到数据");
                            reject(data);
                        }
                    },
                    {
                        name: "确认",
                        className: "btn-primary",
                        callback: (data: any) => {
                            console.log("得到数据");
                            resolve(data);
                        }
                    }]
            } as unknown as OpenConfigure
            _that.open(openConfig);
        })
    }

    message(config: MessageConfigure): void {
        let width=config.msg.length*20>200?config.msg.length*20:200;

        const openConfig = {
            title: config.title,
            max: false,
            min: false,
            footer: false,
            header: false,
            className:"layer-msg",
            autoCloseTime: 2000,
            position: {
                top: 40,
                width:width
            },
            content: {
                component: Message,
                props: config
            }
        } as unknown as OpenConfigure
        this.open(openConfig);
    }

    open(config: OpenConfigure): void {
        // eslint-disable-next-line no-undef
        const id = this.initDom(config.className);
        const options: OpenConfigure = LayerUtil.mergeJson(config, this.configure) as OpenConfigure;
        options.id = id;
        options["content"] = config.content;
        if (options.position) {
            options.position = this.getRelativePosition(options.position);
        }
        const HelloWorld = defineComponent({
            render() {
                return h(LayerWrapper, {options: options})
            }
        })


        // @ts-ignore

        const {el, vNode} = Mount(HelloWorld, {props: {}, app: this.app,})
        // @ts-ignore
        document.getElementById(id).appendChild(el);
        console.log(vNode);
        return vNode;
    }

    closeAll() {

    }

    static close(id: string): void {
        const layer = document.getElementById(id);
        const mask = document.getElementById(`${layer_mask_prefix}_${id}`)
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