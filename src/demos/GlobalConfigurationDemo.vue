<template>
  <h2>
    模态框示例
  </h2>
  <el-button type="primary" @click="open()">无配置模态框</el-button>
  <el-button type="primary" @click="modal('sm')">预设SM尺寸模态框</el-button>
  <el-button type="primary" @click="modal('md')">预设MD尺寸模态框</el-button>
  <el-button type="primary" @click="modal('lg')">预设LG尺寸模态框</el-button>
  <el-button type="primary" @click="modal('full')">全屏模态框</el-button>

  <h2>
    提示框示例
  </h2>
  <el-button type="primary" @click="confirm">确认框</el-button>
  <el-button type="success" @click="success">成功</el-button>
  <el-button type="danger" @click="error">失败</el-button>
  <el-button type="info" @click="info">提示</el-button>
  <h2>
    表单
  </h2>
  <el-button type="primary" @click="createForm">创建表单</el-button>
  <el-button type="primary" @click="updateForm">更新表单</el-button>
  <el-button type="primary" @click="readForm">只读表单</el-button>
  <h2>其他</h2>
  <el-button type="primary" @click="images">图片</el-button>
  <el-button type="primary" @click="test">测试</el-button>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Layer from "~/components/Layer/ts/Layer";
import UserForm from "@/components/UserForm.vue"
export default {
  name: "GlobalConfigurationDemo",
  data() {
    return {
      src: "../assets/1.jpg"
    }
  },
  setup() {
    const test = () => {
      Layer.open({});
    }
    return {
      test
    }
  },
  methods: {
    open() {
      this.$layer.open({});
    },
    confirm() {
      this.$layer.confirm("您确定要删除么?").then((msg) => {
        alert("点击了确认按钮")
      }).catch((msg) => {
        alert("点击了取消按钮")
      })
    },
    modal(size) {
      this.$layer.modal({
        title: `${size}尺寸模态框示例`,
        position: size,
        content: {
          component: HelloWorld,
          parent: this,
          props: {
            msg: "参数传递"
          }
        }
      });
    },
    error() {
      this.$layer.error("我是错误提示信息");
    },
    success() {
      this.$layer.success("我是成功提示消息");
    },
    info() {
      this.$layer.info("我是普通提示消息");
    },
    createForm() {
      this.$layer.createForm({
        title: "创建用户",
        mask: true,
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        }
      }).then(()=>{
        alert("成功反馈")
      }).catch(()=>{
        alert("取消反馈")
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
      }).then(()=>{
        alert("成功反馈")
      }).catch(()=>{
        alert("取消反馈")
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
    },
     getSrc(url){
      return new URL(url, import.meta.url).href
    },
    images() {

      this.$layer.images({
        imgList: [
          {
            src: this.getSrc("/src/assets/1.jpg")
          },
          {
            src: this.getSrc("/src/assets/3.jpg")
          },
          {
            src: this.getSrc("/src/assets/2.jpg")
          }
        ]
      });
    }
  }
}
</script>

<style scoped>

</style>