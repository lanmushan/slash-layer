// mount.js

import {createVNode, render} from 'vue'

export const mount = (component, {props = {}, app = undefined} = {}) => {
    let el = null;
    let vNode = createVNode(component, props)
    if (app && app["_context"]) {
        vNode.appContext = app["_context"]
    }
    if (el && vNode) {
        render(vNode, el)
    } else if (typeof document !== 'undefined') {
        render(vNode, el = document.createElement('div'))
    }

    // const destroy = () => {
    //     if (el) render(null, el)
    //     el = null
    //     vNode = null
    // }

    return {vNode, el}
}