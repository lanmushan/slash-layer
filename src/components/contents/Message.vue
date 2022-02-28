<template>
  <div class="message-wrapper">
    <div class="success msg-box">
      <span class=" icon iconfont" :style="{color:iconColor}" v-if="icon" v-html="icon"></span>
      <span class="msg">{{ msg }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import {OpenConfigure} from "@/ts/LayerConfigure";

const {defineComponent} = require("vue");
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
  box-sizing: border-box;
  text-align: center;
  padding: 10px;

  .success {
    .icon {
      padding: 0px;
      margin-right: 10px;
      line-height: 40px;
    }

    .msg {
      margin-top: 10px;
      color: #6a6767;
      line-height: 40px;

      font-size: 16px;
    }
  }
}

</style>