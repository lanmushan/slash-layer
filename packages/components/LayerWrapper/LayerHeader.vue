<template>
  <div @dblclick.self="onToggleSize" @mousedown="onMouseDown">
    <span class="title">
      {{ title }}</span>
    <span class="header-tool">
      <i class="iconfont" v-if="info" title="说明">&#xe65a;</i>
      <i class="iconfont" v-if="min" @click="onMinSize" title="最小化">&#xe622;</i>
      <i class="iconfont" @click="onToggleSize" v-if="full" title="最小化">&#xe749;</i>
      <i class="iconfont" @click="onToggleSize" v-if="max&&!full" title="最大化">&#xe70e;</i>
      <i class="iconfont" @click="onClose()" title="关闭">&#xe661;</i>
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs} from "vue";
import LayerUtil from "../Layer/ts/LayerUtil";


export default defineComponent({
  name: "LayerHeader",
  props: ["min", "max", "title", "info", "id", "drag"],
  data() {
    return {
      full: false,
      moved: false,
      move: {
        startX: 0,
        startY: 0,
        elmStartX: 0,
        elmStartY: 0
      },
      homePosition: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }
    }
  },
  directives: {},
  emits: ["close", "toggleSize", "minSize"],
  methods: {
    onClose() {
      this.$emit("close");
    },
    onToggleSize() {
      this.$emit("toggleSize");
    },
    onMinSize() {
      this.$emit("minSize")
    },
    onMouseDown(e: any) {
      if (!this.drag) {
        return;
      }
      const elm: HTMLElement | null = document.getElementById(this.id);
      if (!elm) {
        return;
      }
      document.onmousemove = this.onMouseMove;
      document.onmouseup = this.onmouseup;
      this.move.startX = e.clientX;
      this.move.startY = e.clientY;
      this.move.elmStartX = elm?.offsetLeft;
      this.move.elmStartY = elm?.offsetTop;
      this.moved = true;
      elm.classList.remove("slash-trans")
    },
    onMouseMove(e: any) {
      const offsetX = e.clientX - this.move.startX
      const offsetY = e.clientY - this.move.startY
      if (this.moved) {
        const elm: HTMLElement | null = document.getElementById(this.id);
        if (elm) {
          let curTop = (offsetY + this.move.elmStartY);
          let curLeft = (offsetX + this.move.elmStartX)
          let maxTop = (window.innerHeight - elm.offsetHeight);
          let maxLeft = (window.innerWidth - elm.offsetWidth);

          curTop = curTop > 0 ? curTop : 0;
          curLeft = curLeft > 0 ? curLeft : 0;
          curTop = curTop < maxTop ? curTop : maxTop;
          curLeft = curLeft < maxLeft ? curLeft : maxLeft;
          elm.style.top = curTop + "px";
          elm.style.left = curLeft + "px"
        }
      }
    },
    onmouseup() {
      const elm: HTMLElement | null = document.getElementById(this.id);
      elm?.classList.add("slash-trans")
      this.moved = false;
      document.onmousemove = null;
    },

  },
})
</script>

<style scoped lang="less">


</style>