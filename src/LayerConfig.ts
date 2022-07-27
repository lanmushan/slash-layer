import {LayerGlobalConfigure} from "../packages/components/Layer/ts/LayerConfigureDefinition";

export const config = {
    title: "自定义全局标题",
    max: false,
    min: false,
    header: true,
    loadingTime: 1000,
    dbFull:true,
    allowMove:true,
    successDecide(msg: any) {
        console.log(msg);
        if (msg.code == 200) {
            return {
                msg: msg.msg, result: true, data: msg.data
            }
        } else {
            return {
                msg: msg.msg, result: false, data: msg.data
            }
        }
    }
} as LayerGlobalConfigure
export default config