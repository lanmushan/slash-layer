import {Prop, PropType} from "vue";
import {PictureType} from "~/components/LayerImages/DeclareImages";
import {DefineComponent} from "@vue/runtime-core";

export interface LayerPosition {
    width: number,
    height: number,
    top: number,
    left: number
}
export interface LayerCache{
    full:boolean,
    position:LayerPosition,
    sWinPosition:LayerPosition
}
export interface Btn {
    title: {}
}

export interface LayerGlobalConfigure {
    title: string,
    max: boolean,
    min: boolean,
    header: boolean,
    footer: boolean,
    areaDef?: object | null,
    yesFunc?: string | null,
    noFunc?: string | null,
    /*各种提示框自动关闭时间*/
    autoCloseTime: number
    /*加载效果时间*/
    loadingTime: number,
    /*主题*/
    theme?: string
    /*遮罩*/
    mask?: boolean,
    //双击全屏
    dbFull?: boolean,
    loadingText?: string,
    allowMove:boolean,
    successDecide(msg: any): SuccessDecideResult
}

export interface LayerConfigureDefinition {
    title: string,
    max: boolean,
    min: boolean,
    yesFunc?: string | null,
    noFunc?: string | null,
}

export interface SuccessDecideResult {
    result: boolean,
    msg: string,
    data?: object
}

export interface OptionsContent {
    component: DefineComponent | any | object,
    props?: PropType<any> | any,
    parent?:any
}


export interface OpenConfigure extends LayerConfigureDefinition {
    id?: string | undefined,
    position?: LayerPosition | string|any,
    content: OptionsContent|null,
    header: boolean,
    allowMove: boolean,
    footer: boolean,
    btn: Array<OpenBtn>
    autoCloseTime: number
    runMode?: string,
    className?: string | undefined
    loadingTime?: number
    theme?: string,
    mask?: boolean,
    loadingText?: string,
    dbFull?: boolean,

    closeCallBack(id?: string, data?: any): string
}


export interface OpenBtn {
    name: string,
    className: string,
    data: any,
    loading: boolean,
    loadingText: string,
    curLoading?: boolean | null

    callback(instance: any, data?: any): string;
}

export interface ImagesConfigure {
    imgList: Array<PictureType>
}

export interface MessageConfigure {
    title?: string,
    icon?: string,
    iconColor?: string,
    msg: string
}

export interface ConfirmConfigure {
    title?: string,
    icon?: string,
    msg: string,
    data?: any,
    position?: LayerPosition | string,
}

export interface FormConfigure {
    id?: string | undefined,
    title?: string,
    position?: LayerPosition | string,
    content: OptionsContent,
    header?: boolean,
    footer?: boolean,
    btn: Array<OpenBtn>|undefined
    autoCloseTime: number
    runMode?: string,
    className?: string | undefined
    loadingTime?: number
    theme?: string,
    mask?: boolean,
    autoInfo?:boolean,
}

export interface SelectFileConfig{
    accept:Array<string>[],
}