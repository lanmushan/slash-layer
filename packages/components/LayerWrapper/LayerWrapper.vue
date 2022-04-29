<template>
  <div ref="wrapperRef" @mousedown="onTop" class="layer-wrapper" :class="options.className">
    <layer-header class="layer-header" :title="options.title"
                  :max="options.max"
                  :info="options.info"
                  :id="options.id"
                  :min="options.min"
                  :drag="allowMove"
                  v-if="header"
                  @close="onClose"
                  @toggleSize="onToggleSize"
                  @minSize="doMinSize">

    </layer-header>
    <div class="content-wrapper" :style="{height:contentHeight}"
         v-slash-loading="{state:loadingState,text:loadingText}">
      <div class="layer-content">
        <layer-content ref="contentRef" :content="content.component" :props="content.props">
        </layer-content>
      </div>
    </div>
    <layer-footer @btnClick="onBtnCLick" :id="options.id" :btnList="btnList" v-if="footer"></layer-footer>
    <div class="s-win" v-if="sWin" @click="doSwinToNormal">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, PropType, reactive, onMounted, useTransitionState} from "vue";
import LayerHeader from "./LayerHeader.vue";
import LayerContent from "./LayerContent";
import LayerFooter from "./LayerFooter.vue";
import {LayerPosition, OpenBtn, OpenConfigure} from "../Layer/ts/LayerConfigureDefinition";
import LayerUtil from "../Layer/ts/LayerUtil";
import Layer from "../Layer/ts/Layer";

import {toRefs} from "vue";
import {getCurrentInstance} from "vue";
import {ComponentInternalInstance, ComponentPublicInstance} from "@vue/runtime-core";
import useCurrentInstance from "../Layer/ts/UseCurrentInstance";
import {tr} from "element-plus/lib/locale";

export default defineComponent({
  name: "LayerWrapper",
  components: {LayerFooter, LayerContent, LayerHeader},
  data() {
    return {
      full: false,
      moved: false,
      drag: true,
      sWin: false,
      homePosition: {
        width: 200,
        height: 0,
        left: 0,
        top: 0
      },
      /*最小化位置*/
      sWinHomePosition: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }
    }
  },
  props: {
    options: {
      type: Object as PropType<OpenConfigure>,
      required: true
    }
  },
  methods: {
    onToggleSize() {
      if (!this.dbFull) {
        return;
      }
      if (!this.full) {
        this.doFullScreen()
      } else {
        this.doRestoreSize();
      }
    },
    doRestoreSize() {
      const elm: HTMLElement | null = document.getElementById(this.id);
      if (elm) {
        this.setPosition(this.homePosition);
        this.sWin = false;
        this.drag = true;
        const footers: HTMLCollection | null = elm.getElementsByClassName("footer");
        if (footers && footers.length > 0) {
          const footer: HTMLElement = footers[0] as HTMLElement;
          footer['style'].position = ""
        }
      }
      this.full = false;
    },
    setPosition(position: LayerPosition) {
      const elm: HTMLElement | null = document.getElementById(this.id);
      if (elm) {
        elm.style.width = position.width + "px";
        elm.style.height = position.height + "px";
        elm.style.top = position.top + "px";
        elm.style.left = position.left + "px";
      }
    },
    doFullScreen() {
      const elm: HTMLElement | null = document.getElementById(this.id);
      if (!elm) {

        return
      }
      const width = LayerUtil.getViewPortWidth();
      const height = LayerUtil.getViewPortHeight();
      this.homePosition.left = elm.offsetLeft;
      this.homePosition.top = elm.offsetTop;
      this.homePosition.height = elm.offsetHeight;
      this.homePosition.width = elm.offsetWidth;
      elm.style.width = "100%";
      elm.style.height = height + 'px';
      elm.style.top = 0 + "px";
      elm.style.left = 0 + "px";
      const footers: HTMLCollection | null = elm.getElementsByClassName("footer");
      if (footers && footers.length > 0) {
        const footer: HTMLElement = footers[0] as HTMLElement;
        footer['style'].position = 'absolute'
      }
      this.full = true;
    },
    doRearrange() {
      const elms: HTMLCollection = document.getElementsByClassName(".slash-layer-swin");
      if (elms) {
        let sumHeight = 0;
        for (let i = 0; i < elms.length; i++) {
          let elm = elms[i] as HTMLDivElement;
          let offsetHeight = elm.offsetHeight;
          let offsetWidth = elm.offsetWidth;
          let scaleY = 120 / offsetHeight;
          elm.style.top = sumHeight + "px";
          sumHeight += offsetHeight * scaleY + 10;

        }
      }
    },
    doMinSize() {
      if (!this.id) {
        return;
      }
      let elm = document.getElementById(this.id);
      if (!elm) {
        return;
      }
      this.drag = false;
      this.sWinHomePosition.left = elm.offsetLeft;
      this.sWinHomePosition.top = elm.offsetTop;
      this.sWinHomePosition.height = elm.offsetHeight;
      this.sWinHomePosition.width = elm.offsetWidth;

      let scaleX = 200 / elm.offsetWidth;
      let scaleY = 120 / elm.offsetHeight;

      elm.style.transform = `scale(${scaleX},${scaleY})`;
      elm.style.left = LayerUtil.getViewPortWidth() - elm.offsetWidth * scaleX + "px";
      let elms = document.querySelectorAll(".slash-layer-swin");
      let sumHeight = 0;
      if (elms) {
        for (let i = 0; i < elms.length; i++) {
          const elm = elms[i] as HTMLDivElement;
          let offsetHeight = elm.offsetHeight;
          let scale = 120 / offsetHeight;
          sumHeight += offsetHeight * scale + 10;
        }
      }
      elm.style.top = sumHeight + "px";
      elm.classList.add("slash-layer-swin")
      this.sWin = true;
    },
    doSwinToNormal() {
      const elm: HTMLElement | null = document.getElementById(this.id);
      if (elm) {
        elm.style.transform = ``
        elm.classList.remove("slash-layer-swin");
        elm.style.width = this.sWinHomePosition.width + "px";
        elm.style.height = this.sWinHomePosition.height + "px";
        elm.style.top = this.sWinHomePosition.top + "px";
        elm.style.left = this.sWinHomePosition.left + "px";
      }
      this.drag = true;
      this.sWin = false;
      this.onTop();
      this.doRearrange()
    },
    onClose() {
      Layer.close(this.id);
      if (this.$props.options.closeCallBack) {
        this.$props.options.closeCallBack();
      }
    },
    onTop() {
      Layer.top(this.id);
    },
    doInit() {
      if (this.$props.options.position) {
        this.setPosition(this.$props.options.position as LayerPosition)
      }
    },

  },
  mounted() {
    this.onTop();
  },
  created() {
    this.doInit();
  },
  setup(props, ctx) {
    const {
      id,
      title,
      position,
      autoCloseTime,
      runMode,
      content,
      loadingTime,
      footer,
      header,
      loadingText,
      dbFull,
      allowMove,
    } = toRefs(props.options);
    const btnList = ref(reactive(props.options.btn));
    if (!btnList.value && footer) {
      footer.value = false;
    }
    if (runMode) {
      content.value.props['runMode'] = runMode.value;
    }
    const loadingState = ref((typeof loadingTime !== "undefined" || loadingTime) ? true : false);
    const wrapperRef = ref<InstanceType<any>>()
    const contentRef = ref<InstanceType<typeof LayerContent>>()
    const instanceRef = ref<any>(null);
    const contentHeight = ref<number | string>("calc(100% - 80px)");
    if (footer.value === false && header.value === false) {
      contentHeight.value = "100%"
    } else if (footer.value === false || header.value === false) {
      contentHeight.value = "calc(100% - 40px)"
    }
    const doTest = () => {
      console.log(11111111111111);
    }
    /**
     * 提交
     * */
    const doSubmit = () => {
      const {targetRef} = toRefs(contentRef.value);
      if (targetRef == null) {
        console.error("目标表单为空")
      }
      if (targetRef.value.doSubmit) {
        const result = targetRef.value.doSubmit();
        if (LayerUtil.checkPromise(result)) {
          return result;
        } else {
          return new Promise((resolve, reject) => {
            if (typeof result == "object") {
              return resolve(result);
            } else {
              reject(result);
            }
          })
        }

      } else {
        return new Promise((resolve, reject) => {
          reject("未找到目标表单提交方法doSubmit");
        })
      }
    }
    const doUpdate = () => {
      const {targetRef} = toRefs(contentRef.value);
      if (targetRef == null) {
        console.error("目标表单为空")
      }
      if (targetRef.value.doUpdate) {
        const result = targetRef.value.doUpdate();
        if (LayerUtil.checkPromise(result)) {
          return result;
        } else {
          return new Promise((resolve, reject) => {
            if (typeof result == "object") {
              return resolve(result);
            } else {
              reject(result);
            }
          })
        }
      } else {
        return new Promise((resolve, reject) => {
          reject("未找到目标表单提交方法doUpdate");
        })
      }
    }
    const setLoadingState = (state: boolean, text?: string) => {
      if (btnList.value) {
        for (let i = 0; i < btnList.value.length; i++) {
          const bt: OpenBtn = btnList.value[i] as OpenBtn;
          bt.curLoading = state;
        }
      }
      loadingState.value = state;
      if (text && loadingText) {
        loadingText.value = text;
      }
    }
    /**
     *取消加载效果
     */
    const cancelLoading = () => {
      for (let i = 0; i < btnList.value.length; i++) {
        const bt: OpenBtn = btnList.value[i] as OpenBtn;
        bt.curLoading = false;
      }
      loadingState.value = false;
    }
    /**
     * 当底部按钮被点击
     * @param index
     */
    const onBtnCLick = (index: number) => {
      setLoadingState(true);
      if (btnList.value) {
        const bt: OpenBtn = btnList.value[index] as OpenBtn;
        if (bt.loading) {
          loadingState.value = true;
          if (loadingText) {
            loadingText.value = bt.loadingText;
          }
        }
        if (bt.callback) {
          bt.callback(instanceRef, bt.data);
        }
      }
    }
    if (loadingTime) {
      setTimeout(() => {
        setLoadingState(false)
      }, loadingTime.value);
    }

    onMounted(() => {
      const {proxy} = useCurrentInstance();
      instanceRef.value = proxy;
    });

    return {
      id,
      title,
      wrapperRef,
      allowMove,
      position,
      footer,
      dbFull,
      doTest,
      contentRef,
      onBtnCLick,
      header,
      btnList,
      content,
      contentHeight,
      loadingText,
      loadingState,
      cancelLoading,
      doSubmit,
      doUpdate
    }
  }
})
</script>

<style lang="less">
@import "../Layer/css/layer.less";
@import "../Layer/css/icon/iconfont/iconfont.css";

.s-win {
  position: absolute;
  height: 100%;
  width: 100%;
  //background: rgba(24, 21, 21, 0.2);
  top: 0px;
  left: 0px;
}


</style>