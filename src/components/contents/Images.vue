<template>
  <div class="">

  </div>
  <img :src="it.src" v-for="(it,index) in imgList">
</template>

<script lang="ts">
import {PictureType} from "./DeclareImages";

import {defineComponent, ref, PropType, reactive, onMounted, useTransitionState} from "vue";

export default defineComponent({
  name: "Images",
  props: {
    imgList: {
      type: Object as PropType<PictureType>,
    }
  },
  setup(props) {
    console.log(props);
  }
})
</script>

<style scoped>

</style>