
export const config = {
    title: "自定义全局标题",
    max: false,
    min: false,
    loadingTime: 200,
    successDecide(msg) {
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
}
export default config;