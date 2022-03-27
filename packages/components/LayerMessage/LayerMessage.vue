<template>
  <div class="message-wrapper">
    <div class="success msg-box">
      <div class="left-box">
        <span class=" icon iconfont" :style="{color:iconColor}" v-if="icon" v-html="icon"></span>
      </div>
      <div class="right-box">

        <span class="msg">{{ msg }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {OpenConfigure} from "../Layer/ts/LayerConfigureDefinition";

import {defineComponent} from "vue";
export default defineComponent({
  name: "Message",
  props: {
    msg: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    iconColor: {
      type: String,
      required: false,
      default: "red"
    }
  }
})
</script>

<style scoped lang="less">
.message-wrapper {
  .success {
    display: block;
    .left-box {
      display: inline-block;
      text-align: right;
      width: 40px;
      box-sizing: border-box;
      vertical-align: top;
      .icon {
        padding: 0px;
        font-size: 32px;
        line-height: 40px;
        clear: both;
      }
    }

    .right-box {
      display: inline-block;
      height: 40px;
      vertical-align: top;
      padding-left: 10px;
      box-sizing: border-box;
      width: calc(100% - 40px);
    }

    .msg {
      margin-top: 10px;
      color: #6a6767;
      font-size: 16px;
      height: 100%;
      line-height: 40px;
      vertical-align: middle;
    }
  }
}

</style>