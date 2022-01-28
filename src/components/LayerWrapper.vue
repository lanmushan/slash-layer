<template>
  <div>
    <layer-modal @mousedown="onTop">
      <layer-header :title="options.title"
                    :max="options.max"
                    :info="options.info"
                    :id="options.id"
                    :min="options.min"
                    :drag="drag"
                    @close="onClose"
                    @toggleSize="onToggleSize"
                    @minSize="doMinSize"
      >
      </layer-header>
      <layer-content>
        <component ref="content" :is="options.content.component"></component>
      </layer-content>
      <layer-footer></layer-footer>
    </layer-modal>
    <div class="mask" v-if="sWin" @click="doSwinToNormal">

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, PropType} from "vue";
import LayerHeader from "@/components/LayerHeader.vue";
import LayerContent from "@/components/LayerContent.vue";
import LayerFooter from "@/components/LayerFooter.vue";
import LayerModal from "@/components/LayerModal.vue";
import {OpenConfigure} from "@/ts/LayerConfigure";
import LayerUtil from "@/ts/LayerUtil";

const {toRefs} = require("vue");

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
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
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
      required:true
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
        elm.style.width = this.homePosition.width + "px";
        elm.style.height = this.homePosition.height + "px";
        elm.style.top = this.homePosition.top + "px";
        elm.style.left = this.homePosition.left + "px";
        this.sWin = false;
        this.drag = true;
        const footers: HTMLCollection | null = elm.getElementsByClassName("footer");
        if (footers && footers.length > 0) {
          const footer: Element = footers[0];
          footer['style'].position = ""
        }
      }
      console.log("还原");
      this.full = false;
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
      let elm = document.getElementById(this.id);
      if (elm) {
        elm.remove();
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
  },
  mounted() {
    this.onTop();
  },
  setup(props) {
    let {id,title}=toRefs(props);
    console.log(props.options);
    return {id, title}
  }
})
</script>

<style lang="less">
@import "../css/layer.less";
@import "../css/icon/iconfont/iconfont.css";

.mask {
  position: absolute;
  height: 100%;
  width: 100%;
  //background: rgba(24, 21, 21, 0.2);
  top: 0px;
  left: 0px;
}
</style>