import {createVNode, defineComponent, h, PropType, ref, toRefs} from 'vue'
import {OptionsContent} from "../Layer/ts/LayerConfigureDefinition";
import {Component, DefineComponent, VNode} from "@vue/runtime-core";

export default defineComponent({
        render() {
            const content: DefineComponent = this.content as DefineComponent;
            let props = this.props;
            const vNode: VNode = createVNode(content, {
                ref: "targetRef",
                ...props
            });
            // return createVNode("div", {class: "content-box"}, [vNode]);
            return vNode;
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
            const {props, content} = toRefs(p);
            const targetRef = ref<InstanceType<any>>()
            const doSubmit = () => {
                if (targetRef.value.doSubmit) {
                    return targetRef.value.doSubmit();
                }

            }
            return {
                props,
                content,
                doSubmit,
                targetRef
            }
        }
    }
)
