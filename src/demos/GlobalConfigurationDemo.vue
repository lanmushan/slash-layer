<template>
  <h2>
    模态框示例
  </h2>
  <h3>尺寸</h3>
  <el-button type="primary" @click="open()">默认无配置情况模态框</el-button>
  <el-button type="primary" @click="modal('sm')">预设SM尺寸模态框</el-button>
  <el-button type="primary" @click="modal('md')">预设MD尺寸模态框</el-button>
  <el-button type="primary" @click="modal('lg')">预设LG尺寸模态框</el-button>
  <el-button type="primary" @click="modal('full')">全屏模态框</el-button>
  <h3>自定义尺寸位置</h3>
  <el-button type="default" @click="customSizeModal()">自定义大小400*400</el-button>
  <el-button type="default" @click="customPositionModal()">自定义位置和大小</el-button>
  <h3>自定义操作</h3>
  <el-button type="default" @click="notMinModal()">取消最小化按钮</el-button>
  <el-button type="default" @click="notMaxModal()">取消最大化按钮</el-button>
  <el-button type="default" @click="notDbFullModal()">取消双击全屏</el-button>
  <el-button type="default" @click="notMove()">关闭拖动</el-button>

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
  <el-button type="primary" @click="createForm">创建模式表单</el-button>
  <el-button type="primary" @click="updateForm">修改模式表单</el-button>
  <el-button type="primary" @click="readForm">只读模式表单</el-button>
  <h2>其他</h2>
  <el-button type="primary" @click="images">图片查看器</el-button>
  <h2>功能性操作</h2>
  <el-button type="primary" @click="closeAll()">关闭全部</el-button>
  <el-button type="primary" @click="selectFile">选择文件</el-button>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Layer from "~/components/Layer/ts/Layer";
import UserForm from "@/components/UserForm.vue"
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";

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
    customSizeModal() {
      Layer.open({
        position: {
          width: 400,
          height: 400
        }
      })
    },
    notMaxModal() {
      Layer.open({
        max: false,
      })
    },
    notDbFullModal() {
      Layer.open({
        dbFull: false,
      })
    },
    notMinModal() {
      Layer.open({
        min: false,
      })
    },
    notMove() {
      Layer.open({
        allowMove: false,
        title: "不可拖动"
      })
    },
    customPositionModal() {
      Layer.modal({
        position: {
          top: 200,
          left: 100,
          width: 400,
          height: 400
        }
      })
    },
    open() {
      this.$layer.open({});
    },
    confirm() {
      Layer.confirm("您确定要删除么?").then((msg) => {
        alert("点击了确认按钮")
      }).catch((msg) => {
        alert("点击了取消按钮")
      })
    },
    modal(size) {
      Layer.modal({
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
      Layer.error("我是错误提示信息");
    },
    success() {
      Layer.success("我是成功提示消息");
    },
    info() {
      Layer.info("我是普通提示消息");
    },
    createForm() {
      Layer.createForm({
        title: "创建",
        mask: true,
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        }
      }).then(() => {
        alert("成功反馈")
      }).catch(() => {
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
      }).then(() => {
        alert("成功反馈")
      }).catch(() => {
        alert("取消反馈")
      });
    },
    selectFile(){
      Layer.selectFile({

      });
    },
    readForm() {
      Layer.readForm({
        title: "创建用户",
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        }
      });
    },
    getSrc(url) {
      return new URL(url, import.meta.url).href
    },
    closeAll() {
      Layer.closeAll();
    },
    images() {

      Layer.images({
        imgList: [
          {
            src: img1
          },
          {
            src: img2
          },
          {
            src: img3
          }
        ]
      });
    }
  }
}
</script>

<style scoped>

</style>