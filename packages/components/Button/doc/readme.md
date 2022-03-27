## 测试按钮

<script setup>
import demo from './demo.vue'
</script>
<demo />

## 示例代码

```javascript
<template>
  <div>
    adsasdljflajl
    <test @click="onClick">lsadjflasjlfasj</test>
    <readme></readme>
  </div>
</template>

<script lang="ts">
import test from '../index.vue'
import readme from './readme.md'

const onClick = (num) => {
  console.log(`我是第 ${num} 个自定义按钮`)
}
export default {
  onClick,
  components: {
    test, readme
  }
}
</script>
<style>

</style>
```