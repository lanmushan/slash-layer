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

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import Layer from "~/components/Layer/ts/Layer";
import UserForm from "@/components/UserForm.vue"
import img1 from "@/assets/1.jpg";
import {OpenConfigure} from "~/components/Layer/ts/LayerConfigureDefinition";

export default {
  name: "GlobalConfigurationDemo",
  data() {
    return {
      src: "../assets/1.jpg"
    }
  },
  setup() {
    const customSizeModal = () => {
      Layer.open({
        position: {
          width: 400,
          height: 400
        },
        content: null,
        header: true,
        allowMove: false,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string {
          throw new Error('Function not implemented.');
        },
        title: '',
        max: false,
        min: false
      })
    }
    const notMaxModal = () => {
      Layer.open({
        max: false,
        content: null,
        header: true,
        allowMove: false,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string {
          throw new Error('Function not implemented.');
        },
        title: '',
        min: false
      })
    }
    const notDbFullModal = () => {
      Layer.open({
        dbFull: false,
        content: null,
        header: true,
        allowMove: false,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string {
          throw new Error('Function not implemented.');
        },
        title: '',
        max: false,
        min: false
      })
    }
    const notMinModal = () => {
      Layer.open({
        min: false,
        content: null,
        header: true,
        allowMove: false,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string {
          throw new Error('Function not implemented.');
        },
        title: '',
        max: false
      })
    }
    const notMove = () => {
      Layer.open({
        allowMove: false,
        title: "不可拖动",
        content: null,
        header: true,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string {
          throw new Error('Function not implemented.');
        },
        max: false,
        min: false
      })
    }
    const customPositionModal = () => {
      Layer.modal({
        position: {
          top: 200,
          left: 100,
          width: 400,
          height: 400
        },
        content: null,
        header: true,
        allowMove: false,
        footer: false,
        btn: [],
        autoCloseTime: 0,
        closeCallBack: function (id?: string, data?: any): string {
          throw new Error('Function not implemented.');
        },
        title: '',
        max: false,
        min: false
      })
    }
    const open = () => {
      Layer.open({} as any);
    }
    const confirm = () => {
      Layer.confirm("您确定要删除么?").then((msg) => {
        alert("点击了确认按钮")
      }).catch((msg) => {
        alert("点击了取消按钮")
      })
    }
    const modal = (size: string) => {
      Layer.modal({
        title: `${size}尺寸模态框示例`,
        position: size,
        content: {
          component: HelloWorld,
          parent: this,
          props: {
            msg: "参数传递"
          }
        },
        max: false,
        min: false
      } as OpenConfigure);
    }
    const error = () => {
      Layer.error("我是错误提示信息");
    }
    const success = () => {
      Layer.success("我是成功提示消息");
    }
    const info = () => {
      Layer.info("我是普通提示消息");
    }
    const createForm = async () => {
      await Layer.createForm({
        title: "创建",
        mask: true,
        content: {
          component: UserForm
        },
        btn: [],
        autoCloseTime: 0
      })
    }

    const updateForm = () => {
      Layer.updateForm({
        title: "创建用户",
        content: {
          component: UserForm,
        },
        btn: [],
        autoCloseTime: 0
      }).then(() => {
        alert("成功反馈")
      }).catch(() => {
        alert("取消反馈")
      });
    }

    const selectFile = () => {
      Layer.selectFile({
        accept: []
      });
    }

    const readForm = () => {
      Layer.readForm({
        title: "创建用户",
        content: {
          component: UserForm,
          props: {
            msg: "创建用户"
          }
        },
        btn: [],
        autoCloseTime: 0
      });
    }

    const getSrc = (url: string) => {
      return new URL(url, import.meta.url).href
    }

    const closeAll = () => {
      Layer.closeAll();
    }

    const images = () => {
      Layer.images({
        imgList: [
          {
            title: 'xxx',
            src: img1
          }

        ]
      });
    }
    return {
      notMove,
      notMinModal,
      notDbFullModal,
      notMaxModal,
      customPositionModal,
      customSizeModal,
      closeAll,
      open, confirm, success, error, modal, readForm, createForm, updateForm, info, selectFile,
    }
  }
}
</script>

<style scoped>

</style>