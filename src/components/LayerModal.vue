<template>
  <div class="slash-modal">
    <slot>

    </slot>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({})
</script>
<style>
.slash-modal {
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  box-shadow: 3px 3px 5px rgba(205, 205, 205, 0.67),
  -3px -3px 3px rgba(205, 205, 205, 0.56);
  background: white;
}
</style>