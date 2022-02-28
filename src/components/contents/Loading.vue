<template>
  <div class="slash-loading">
    <div class="loading-content">
      <span class="iconfont icon-jiazai loading-icon"></span>
      <span class="loading-describe">{{ describe }}</span>
    </div>
  </div>
</template>

<script lang="ts">
const {defineComponent} = require("vue");
export default defineComponent({
      name: "Loading",
      props: ["describe"]
    }
)
</script>

<style scoped>

</style>