<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import {ref} from "vue";

const {toRefs} = require("vue");

export default {
  name: "LayerContent",
  props: ["name"],
}
</script>

<style lang="less">
</style>