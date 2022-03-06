import {LayerPosition} from "../src/ts/LayerGlobalConfigure";

export const config = {
    title: "全局标题测试",
    max: false,
    min: false,
    areaDef: {
        "sm": {
            width: 400,
            height: 600,
            top: 200
        },
        "md": {
            width: 800,
            height: 600,
            top: 200
        },
        "lg": {
            width: 800,
            height: 600,
            top: 200
        }
    },
    loadingTime: 200,
    successDecide(msg) {
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
}
export default config;