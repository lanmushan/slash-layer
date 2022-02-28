// @ts-ignore
import {layer_id_prefix} from "@/consts/LayerConst";

export default class LayerUtil {
    static uuid(): string {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    static createId(): string {
        return layer_id_prefix + LayerUtil.uuid();
    }

    static getViewPortWidth(): number {
        return document.documentElement.clientWidth || document.body.clientWidth;
    }

    static getViewPortHeight(): number {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    static getAbsolutePosition(reference, target): any {
        //因为我们会将目标元素的边框纳入递归公式中，这里先减去对应的值
        const result = {
            left: -target.clientLeft,
            top: -target.clientTop,
            right: 0,
            bottom: 0
        }
        let node = target;
        while (node != reference && node != document) {
            result.left = result.left + node.offsetLeft + node.clientLeft;
            result.top = result.top + node.offsetTop + node.clientTop;
            node = node.parentNode;
        }
        if (isNaN(reference.scrollLeft)) {
            result.right = document.documentElement.scrollWidth - result.left;
            result.bottom = document.documentElement.scrollHeight - result.top;
        } else {
            result.right = reference.scrollWidth - result.left;
            result.bottom = reference.scrollHeight - result.top;
        }
        return result;
    }

    /**
     * 合并Json
     * @param options
     * @param def
     */
    static mergeJson(options, def): Object {
        for (const key in def) {
            if (options[key] == undefined) {
                options[key] = def[key];
            }
        }
        return options;
    }

    static leftMergeJson(left, right): Object {
        for (const key in right) {
            if (right[key] != undefined) {
                left[key] = right[key];
            }
        }
        return left;
    }

    static deepClone(obj): Object {
        const result = typeof obj.splice === "function" ? [] : {};
        if (obj && typeof obj === 'object') {
            for (const key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    result[key] = LayerUtil.deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }
            }
            return result;
        }
        return obj;
    }
}
