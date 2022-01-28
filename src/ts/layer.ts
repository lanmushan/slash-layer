import {App, h} from "vue";
import {createVNode, defineComponent, ref} from 'vue'

import {createApp} from 'vue'

import LayerWrapper from "@/components/LayerWrapper.vue";
import {LayerConfigure, OpenConfigure} from "@/ts/LayerConfigure"
import LayerBox from "./LayerBox";

import LayerUtil from "@/ts/LayerUtil";

const defaultConfig: LayerConfigure = {
    title: "张三",
    max: true,
    min: true,
    loadingTime: 200
} as LayerConfigure;

class Layer {
    configure: LayerConfigure
    static wrapId: string = "slash_layer";
    elm: HTMLElement | null | undefined;

    constructor(config?: LayerConfigure) {
        if (config == undefined) {
            this.configure = defaultConfig;
        } else {
            this.configure = LayerUtil.mergeJson(defaultConfig, config) as LayerConfigure;
        }
    }

    initDom(): string {
        const div = document.createElement("div");
        const id = LayerUtil.createId();
        div.id = id;
        div.className = "slash-layer";
        document.body.appendChild(div);
        return id;

    }

    // @ts-ignore
    open(config: OpenConfigure): void {
        // eslint-disable-next-line no-undef
        const id = this.initDom();
        const options:OpenConfigure = LayerUtil.mergeJson(config,this.configure) as OpenConfigure;
        options.id=id;
        options["content"] = config.content;
        const HelloWorld = defineComponent({
            render() {
                return h(LayerWrapper, {options: options})
            }
        })
        const vm = createApp(HelloWorld)
        const evm = vm.mount(`#${id}`);
        console.log(evm);
        console.log(evm.$el)
        this.elm?.appendChild(evm.$el);
    }
}

export default Layer