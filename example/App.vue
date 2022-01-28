<template>
  <button @click="test">查看对象</button>
  <button @click="open()">open</button>
  <button @click="open()">open</button>

</template>

<script>
import HelloWorld from "./components/HelloWorld"
export default {
  name: 'App',
  components: {}, methods: {
    test() {
      console.log("哈哈哈", this.$layer);
    },
    open(){
      this.$layer.open({
          title:"张三",
          content:{
            component: HelloWorld
          }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
