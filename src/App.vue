<template>
  <div>
    <h1>
      全局配置
    </h1>
    <global-configuration-demo></global-configuration-demo>
  </div>

</template>
<script lang="ts">
import UserForm from "./components/UserForm.vue"
import GlobalConfigurationDemo from "@/demos/GlobalConfigurationDemo.vue";
import {Layer} from "~";

export default {
  name: 'App',
  components: {GlobalConfigurationDemo}, methods: {
    test() {
    },
    open() {
      Layer.success({
        title: "",
        iconColor: "red",
        msg: "哈哈哈哈哈",
      })
    },
    success() {
      Layer.success({
        title: "",
        iconColor: "red",
        msg: "哈哈哈哈哈",
      })
    },
    danger() {
      Layer.error("错误信息");
    },
    success2() {
      Layer.success("我是第二我是第二种参数我是第二种参数我是第二种参数种参数");
    },
    info() {
      Layer.info("哈哈哈");
    },
    confirm() {
      Layer.confirm({
        title: "确认",
        msg: "我是确认消息"
      }).then((data) => {
      }).catch((data) => {
      })
    },
    createForm() {
      Layer.createForm({
        title: "创建用户",
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        },
        header: false,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string | undefined {
          throw new Error("Function not implemented.");
        },
        max: false,
        min: false
      });
    },
    updateForm() {
      this.$layer.updateForm({
        title: "创建用户",
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        }
      });
    },
    readForm() {
      this.$layer.readForm({
        title: "创建用户",
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        }
      });
    }
  }
}
</script>

<style>
#app {
  width: 1200px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 60px auto;
}
</style>
