import {Prop, PropType} from "vue";

export interface LayerArea {
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
    areaDef?: Map<string, LayerArea> | LayerArea | string,
    yesFunc?: string | undefined,
    noFunc?: string | undefined,
    /*加载效果时间*/
    loadingTime: number,
}

export interface OptionsContent {
    component:object,
    props: PropType<any>
}

export interface OpenConfigure extends LayerConfigure {
    id?: string,
    size: LayerArea,
    content: OptionsContent
}
