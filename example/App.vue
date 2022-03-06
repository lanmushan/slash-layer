<template>
  <div>
    <h1>
      全局配置
    </h1>
    <global-configuration-demo></global-configuration-demo>
  </div>
  <div>
    <h1>
      自定义配置
    </h1>
    <el-button @click="open">基础弹框</el-button>
    <el-button type="primary">模态框</el-button>
    <el-button type="primary" @click="confirm">确认框</el-button>
    <el-button type="success" @click="success">成功</el-button>
    <el-button type="success" @click="success2">成功2</el-button>
    <el-button type="success" @click="success2">图片</el-button>
    <el-button type="danger" @click="danger">失败</el-button>
    <el-button type="info" @click="info">提示</el-button>
    <el-button type="primary" @click="createForm">创建表单</el-button>
    <el-button type="primary" @click="updateForm">更新表单</el-button>
    <el-button type="primary" @click="readForm">查看表单</el-button>
  </div>

</template>
<script>
import HelloWorld from "./components/HelloWorld"
import UserForm from "./components/UserForm"
import GlobalConfigurationDemo from "./views/GlobalConfigurationDemo";

export default {
  name: 'App',
  components: {GlobalConfigurationDemo}, methods: {
    test() {
      console.log("哈哈哈", this.$layer);
    },
    open() {
      this.$layer.open({
        title: "张三",
        position: {
          width: 200,
          height: 120,
          top: 120,
          left: 200,
        },
        content: {
          component: HelloWorld,
          parent: this,
          props: {
            msg: "参数传递"
          }
        }
      });
    },
    success() {
      this.$layer.success({
        title: "",
        iconColor: "red",
        msg: "哈哈哈哈哈",
      })
    },
    danger() {
      this.$layer.error("错误信息");
    },
    success2() {
      this.$layer.success("我是第二我是第二种参数我是第二种参数我是第二种参数种参数");
    },
    info() {
      this.$layer.info("哈哈哈");
    },
    confirm() {
      this.$layer.confirm({
        title: "确认",
        msg: "我是确认消息"
      }).then((data) => {
        console.log("确认")
      }).catch((data) => {
        console.log("取消")
      })
    },
    createForm() {
      this.$layer.createForm({
        title: "创建用户",
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        }
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
