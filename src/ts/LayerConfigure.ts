import {Prop, PropType} from "vue";
import LayerWrapper from "@/components/LayerWrapper.vue";
import {PictureType} from "@/components/contents/DeclareImages";

export interface LayerPosition {
    width: number,
    height: number,
    top: number,
    left: number
}

export interface Btn {
    title: {}
}

export interface LayerGlobalConfigure {
    title: string,
    max: boolean,
    min: boolean,
    header?: boolean,
    footer: boolean,
    areaDef?: object | undefined,
    yesFunc?: string | undefined,
    noFunc?: string | undefined,
    /*各种提示框自动关闭时间*/
    autoCloseTime: number
    /*加载效果时间*/
    loadingTime: number,
    /*主题*/
    theme?: string
    /*遮罩*/
    mask?: boolean

    successDecide(msg: any): SuccessDecideResult
}

export interface LayerConfigure {
    title: string,
    max: boolean,
    min: boolean,
    yesFunc?: string | undefined,
    noFunc?: string | undefined,
    /*加载效果时间*/
    loadingTime: number,
}

export interface SuccessDecideResult {
    result: boolean,
    msg: string,
    data?: object
}

export interface OptionsContent {
    component: object,
    props: PropType<any>
}


export interface OpenConfigure extends LayerConfigure {
    id: string,
    position?: LayerPosition | string,
    content: OptionsContent,
    header?: boolean,
    footer: boolean,
    btn: Array<OpenBtn>
    autoCloseTime?: number
    runMode?: string,
    className: string | undefined
    loadingTime: number,
    theme?: string,
    mask?: boolean

    closeCallBack(id?: string, data?: any): string;
}


export interface OpenBtn {
    name: string,
    className: string,
    data: any,
    loading: boolean,
    loadingText: string,
    curLoading?: boolean | null

    callback(LayerWrapper, data?: any): string;
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

export interface FormConfigure extends OpenConfigure {
    runMode?: string
}