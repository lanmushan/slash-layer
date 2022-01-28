import {createVNode, defineComponent, h, ref} from 'vue'
// @ts-ignore
import LayerWrapper from '@/components/LayerWrapper.vue'

export default defineComponent({
        render() {
            return h("div", {id: "app"}, [
                    h("img", {src: "xxx"}),
                    h(LayerWrapper, {msg: "HelloWorld"}),
                    createVNode("h1", {class: "hello"}, "HelloWorld")
                ]
            );
        }

    }
)
// export default class LayerBox {
//     name: string = "xx"
//     datat: any
//
//     constructor(datat: any) {
//         this.datat = datat;
//     }
//
//     data() {
//         return this.datat;
//     }
//
//     setup(props: any) {
//         const name = ref('小米')
//         return {name}
//     }
//
//     render() {
//         return h(LayerWrapper,{msg:"哈哈哈"});
//     }
//
// }
