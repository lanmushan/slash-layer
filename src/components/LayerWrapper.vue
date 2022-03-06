<template>
  <div ref="wrapperRef" @mousedown="onTop" class="layer-wrapper" :class="options.className">
    <layer-header class="layer-header" :title="options.title"
                  :max="options.max"
                  :info="options.info"
                  :id="options.id"
                  :min="options.min"
                  :drag="drag"
                  v-if="header"
                  @close="onClose"
                  @toggleSize="onToggleSize"
                  @minSize="doMinSize">

    </layer-header>
    <div class="layer-content" :style="{height:contentHeight}" v-slash-loading="{state:loadingState,text:loadingText}">
      <layer-content ref="contentRef" :content="content.component" :props="content.props">
      </layer-content>
    </div>
    <layer-footer @btnClick="onBtnCLick" :id="options.id" :btnList="btnList" v-if="footer"></layer-footer>
    <div class="s-win" v-if="sWin" @click="doSwinToNormal">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, PropType, reactive, onMounted, useTransitionState} from "vue";
import LayerHeader from "@/components/LayerHeader.vue";
import LayerContent from "@/ts/LayerContent";
import LayerFooter from "@/components/LayerFooter.vue";
import LayerModal from "@/components/LayerModal.vue";
import {LayerPosition, OpenBtn, OpenConfigure} from "@/ts/LayerConfigure";
import LayerUtil from "@/ts/LayerUtil";
import Layer from "@/ts/Layer";

const {toRefs} = require("vue");
import {getCurrentInstance} from "vue";
import {ComponentInternalInstance, ComponentPublicInstance} from "@vue/runtime-core";
import useCurrentInstance from "@/ts/UseCurrentInstance";

export default defineComponent({
  name: "LayerWrapper",
  components: {LayerModal, LayerFooter, LayerContent, LayerHeader},
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
          const footer: Element = footers[0];
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
      console.log(this.id)
      const elm: HTMLElement | null = document.getElementById(this.id);
      if (!elm) {
        console.log("未找到元素")

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
        const footer: Element = footers[0];
        footer['style'].position = 'absolute'
      }
      this.full = true;
      console.log(this.full)
    },
    doRearrange() {
      let elms = document.querySelectorAll(".slash-layer-swin");
      if (elms) {
        let sumHeight = 0;
        for (let i = 0; i < elms.length; i++) {
          let offsetHeight = elms[i]["offsetHeight"];
          let offsetWidth = elms[i]["offsetWidth"];
          let scaleY = 120 / offsetHeight;
          elms[i]["style"].top = sumHeight + "px";
          sumHeight += offsetHeight * scaleY + 10;

        }
      }
    },
    doMinSize() {
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
          let offsetHeight = elms[i]["offsetHeight"];
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
      let elms = document.querySelectorAll(".slash-layer")
      elms.forEach((it) => {
        it["style"].zIndex = 0
      })
      let elm = document.getElementById(this.id);
      if (elm) {
        elm["style"].zIndex = '999';
      }
    },
    doInit() {
      if (this.$props.options.position) {
        console.log(this.$props.options.position)
        this.setPosition(this.$props.options.position as LayerPosition)
      }
    },

  },
  mounted() {
    console.log(this.$props.options);
    this.onTop();
  },
  created() {
    this.doInit();
  },
  setup(props, ctx) {
    console.log("第二次执行")
    const {id, title, position, autoCloseTime, runMode, content, loadingTime, footer, header} = toRefs(props.options);
    const btnList = ref(reactive(props.options.btn));
    if (!btnList.value) {
      footer.value = false;
    }
    if (runMode) {
      content.value.props["runMode"] = runMode;
    }
    const loadingText = ref("初始化加载");
    const loadingState = ref(loadingTime == 0 ? false : true);
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

      }
    }
    const doUpdate = () => {
      const {targetRef} = toRefs(contentRef.value);
      if (targetRef == null) {
        console.error("目标表单为空")
      }
      if (targetRef.value.doUpdate) {
        return targetRef.value.doUpdate();
      }
    }
    const setLoadingState = (state: boolean, text?: string) => {
      console.log("设置加载效果", state)
      for (let i = 0; i < btnList.value.length; i++) {
        const bt: OpenBtn = btnList.value[i] as OpenBtn;
        bt.curLoading = state;
      }
      if (text) {
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
    const onBtnCLick = (index) => {
      setLoadingState(true);
      if (btnList.value) {
        const bt: OpenBtn = btnList.value[index] as OpenBtn;
        if (bt.loading) {
          loadingState.value = true;
          loadingText.value = bt.loadingText;
        }
        if (bt.callback) {
          bt.callback(instanceRef, bt.data);
        }
      }
    }
    setTimeout(() => {
      loadingState.value = false;
    }, loadingTime);
    onMounted(() => {
      const {proxy} = useCurrentInstance();
      instanceRef.value = proxy;
    });

    return {
      id,
      title,
      wrapperRef,
      position,
      footer,
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
      doSubmit
    }
  }
})
</script>

<style lang="less">
@import "../css/layer.less";
@import "../css/icon/iconfont/iconfont.css";

.s-win {
  position: absolute;
  height: 100%;
  width: 100%;
  //background: rgba(24, 21, 21, 0.2);
  top: 0px;
  left: 0px;
}


</style>