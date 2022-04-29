import {LayerGlobalConfigure, LayerPosition} from "./LayerConfigureDefinition";
import {layer_preset_area_default, layer_preset_area_full} from "../consts/LayerConst";
import LayerUtil from "../ts/LayerUtil";

export class OpenConfigureUtil {
    /**
     * 获取位置
     */
    public static getOpenPosition(position: LayerPosition | string | undefined, globalConfigure: LayerGlobalConfigure): LayerPosition {
        const areaDef = globalConfigure.areaDef as any;
        if (typeof position === 'undefined' && !areaDef) {
            console.error("未指定位置和预设位置");
        }
        let resultPosition: LayerPosition = {} as LayerPosition;
        if (typeof position === 'undefined') {
            resultPosition = areaDef[layer_preset_area_default] as LayerPosition;
        } else if (typeof position === "string") {
            if (areaDef[position]) {
                resultPosition = areaDef[position] as LayerPosition;
            } else if (position === layer_preset_area_full) {
                resultPosition = {
                    width: LayerUtil.getViewPortWidth(),
                    height: LayerUtil.getViewPortHeight(),
                    top: 0,
                    left: 0
                } as LayerPosition
            }
        } else if (typeof position === "object") {
            resultPosition = position;
        }
        if (Object.keys(resultPosition).length == 0) {
            console.warn("未指定区域大小")
        }
        if (typeof resultPosition.width === 'undefined') {
            resultPosition.width = areaDef[layer_preset_area_default].width;
        }
        if (typeof resultPosition.height === 'undefined') {
            resultPosition.height = areaDef[layer_preset_area_default].height;
        }
        if (typeof resultPosition.left === "undefined") {
            resultPosition.left = OpenConfigureUtil.getRelativeLeft(resultPosition.width);
        }
        if (typeof resultPosition.top === "undefined") {
            resultPosition.top = areaDef[layer_preset_area_default].top;
        }
        return resultPosition;
    }


    public static getRelativeLeft(width: number): number {
        return LayerUtil.getViewPortWidth() / 2 - width / 2
    }

}

export default OpenConfigureUtil