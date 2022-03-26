import {App, DirectiveBinding, isRef} from "vue";
import {VNode} from "@vue/runtime-core";
import {Mount} from "../../util/Mount";
import Loading from "~/components/LayerLoading/LayerLoading.vue";

export const loadingDirective = (app:App) => {
    app.directive("slash-loading", (pEl: HTMLElement, binding: DirectiveBinding, pVNode: VNode) => {
        let state = false;
        let text = "正在加载中"
        if (typeof binding.value == 'boolean') {
            state = binding.value
        } else if (typeof binding.value == "object") {
            if (isRef(binding.value.state)) {
                state = binding.value.state.value;
            } else if (binding.value.state) {
                state = binding.value.state;
            }
            if (binding.value.text) {
                text = binding.value.text;
            } else if (binding.arg) {
                text = binding.arg;
            }
        }
        if (state) {
            let {el, vNode} = Mount(Loading, {
                props: {
                    describe: text
                },
                app: app as any
            })
            pEl.appendChild(el as Node)
        } else {
            const child: HTMLCollectionOf<Element> = pEl.getElementsByClassName("slash-loading")
            if (child && child.length > 0) {
                const childElm = child[0] as HTMLDivElement;
                //todo 后期增加过度效果
                childElm.remove();
            }
        }
    },)
}