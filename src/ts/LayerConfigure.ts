import {Prop, PropType} from "vue";
import LayerWrapper from "@/components/LayerWrapper.vue";

export interface LayerPosition {
    width: number,
    height: number,
    top: number,
    left: number
}

export interface Btn {
    title: {}
}

export interface LayerConfigure {
    title: string,
    max: boolean,
    min: boolean,
    areaDef?: Map<string, LayerPosition> | LayerPosition | string,
    yesFunc?: string | undefined,
    noFunc?: string | undefined,
    /*加载效果时间*/
    loadingTime: number,

    /**
     * 成功失败判断函数
     * @param msg
     */
    successDecide(msg: any): SuccessDecideResult
}
export interface SuccessDecideResult{
    result:boolean,
    msg:string,
    data?:object
}
export interface OptionsContent {
    component: object,
    props: PropType<any>
}

export interface OpenConfigure extends LayerConfigure {
    id: string,
    position?: LayerPosition,
    content: OptionsContent,
    header?: boolean,
    footer: boolean,
    btn: Array<OpenBtn>
    autoCloseTime?: number
    runMode?:string,
    className:string|undefined
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
    data?: any
}

export interface FormConfigure extends OpenConfigure {
    runMode?: string
}