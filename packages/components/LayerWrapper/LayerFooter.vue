<template>
  <div class="layer-footer">
    <div class="footer-tool">
      <button href="javascript:void(0)"  :disabled="it.curLoading" :class="it.className" v-for="(it, i) in btnList" @click="onClick(i)"
         class="btn">{{ it.name }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import {LayerPosition, OpenBtn, OpenConfigure} from "../Layer/ts/LayerConfigureDefinition";

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
    const onClick = function (index:number) {
      ctx.emit("btnClick", index);
    }
    return {onClick}
  }
})
</script>

<style scoped lang="less">

</style>