import {createVNode, render} from "vue";
import {VNode} from "@vue/runtime-core";

const Mount = (component, {props = {}, app = undefined, elm=null} = {}) => {
    let el: HTMLElement | null=elm;
    let vNode: VNode | null = createVNode(component, props)
    if (app && app["_context"]) {
        vNode.appContext = app["_context"]
    }
    if (el && vNode) {
        render(vNode, el)
    } else if (typeof document !== 'undefined') {
        el = document.createElement('div')
        render(vNode, el)
    }

    const destroy = () => {
        if (el) render(null, el)
        el = null
        vNode = null
    }

    return {vNode, el}
}
export {Mount}