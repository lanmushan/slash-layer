/**
 *
 */
import {LayerGlobalConfigure, LayerPosition, SuccessDecideResult} from "../ts/LayerConfigureDefinition";

export const layer_id_prefix: string = "layer_"
export const layer_root_prefix: string = "root_"

/**
 *
 */
export const layer_mask_prefix: string = "mask"


export const layer_preset_area_sm: string = "sm";
export const layer_preset_area_md: string = "md";
export const layer_preset_area_lg: string = "lg";
export const layer_preset_area_default: string = "default";
export const layer_preset_area_full:string="full"

export const defaultLayerGlobalConfigure = {
    title: "弹出框",
    max: true,
    min: true,
    header: true,
    footer: true,
    autoCloseTime:0,
    loadingTime:200,
    successDecide: (msg: any) => {
        console.error("请配置successDecide才能使用表单弹框")
    },
    areaDef: {
        "sm": {
            width: 400,
            height: 600,
            top: 120
        },
        "md": {
            width: 800,
            height: 600,
            top: 100
        },
        "lg": {
            width: 1200,
            height: 800,
            top: 60
        },
        "default": {
            width: 800,
            height: 600,
            top: 120
        }
    },
} as LayerGlobalConfigure