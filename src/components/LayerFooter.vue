<template>
  <div class="footer">
    <div class="footer-tool">
      <button href="javascript:void(0)"  :disabled="it.curLoading" :class="it.className" v-for="(it, i) in btnList" @click="onClick(i)"
         class="btn">{{ it.name }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import {LayerPosition, OpenBtn, OpenConfigure} from "@/ts/LayerConfigure";

import {defineComponent, PropType, onMounted} from "vue";

export default defineComponent({
  name: "LayerFooter",
  props: {
    id: {
      type: String,
    },
    btnList: {
      type: Object as PropType<OpenBtn>
    }
  },
  emits:["btnClick"],
  methods: {},
  setup(props, ctx) {
    const onClick = function (index) {
      ctx.emit("btnClick", index);
    }
    return {onClick}
  }
})
</script>

<style scoped lang="less">

.footer {
  bottom: 0;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border-top: 1px solid #e4e5e5;
  text-align: right;

  .footer-tool {
    .btn {
      line-height: 1.5715;
      position: relative;
      display: inline-block;
      font-weight: 400;
      margin-right: 10px;
      white-space: nowrap;
      text-decoration: none;
      text-align: center;
      border: 1px solid #d9d9d9;
      letter-spacing: 3px;
      box-shadow: 0 2px #00000004;
      cursor: pointer;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      touch-action: manipulation;
      padding: 4px 15px;
      font-size: 14px;
      border-radius: 2px;
      color: #000000d9;
      background: #fff;
    }

    .btn:hover {
      border-color: #409eff;
      color: #409eff;
    }
    .btn:disabled {
      color: #6a6767;
      border: 1px solid #d9d9d9;
    }
    .btn-primary {
      background: #409eff;
      border-color: transparent;
      color: white;
    }
    .btn-primary:hover {
      background: rgba(83, 165, 249, 0.85);
      border-color: transparent;
      color: white;
    }
    .btn-primary:disabled {
      background: rgba(83, 165, 249, 0.85);
      border-color: transparent;
      color: white;
    }
  }
}
</style>