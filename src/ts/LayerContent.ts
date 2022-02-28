import {createVNode, defineComponent, h, PropType, ref, toRefs} from 'vue'
import {OptionsContent} from "@/ts/LayerConfigure";
import {Component, DefineComponent, VNode} from "@vue/runtime-core";

export default defineComponent({
        render() {
            console.log("执行render")
            const content: DefineComponent = this.content as DefineComponent;
            let props = this.props;
            const vNode: VNode = createVNode(content, {
                ref: "targetRef",
                ...props
            });
            return createVNode("div", {class: "content-box"}, [vNode]);
        },
        props: {
            content: {
                type: Object as PropType<DefineComponent>
            },
            props: {
                type: Object as PropType<any>
            }
        },
        setup(p, ctx) {
            console.log("执行setup")
            const {props, content} = toRefs(p);
            const targetRef = ref<InstanceType<any>>()
            const test = () => {
                console.log(targetRef)
                console.log(targetRef.value);
                console.log(JSON.stringify(targetRef.value.form))
                console.log("哈哈哈");
            }
            return {
                props,
                content,
                test,
                targetRef
            }
        }
    }
)
