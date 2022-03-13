## 插件简介

基于VUE开发的模态框插件，支持常见的表单快速提交和图片预览等功能
## 效果
## 预览效果
![img](../docs/iamges/img.png)
![img](http://lmscms.oss-cn-beijing.aliyuncs.com/slash-layer/images/form.png)
![img](https://lmscms.oss-cn-beijing.aliyuncs.com/slash-layer/images/demo.png)

## 项目特点
1. 为了快速开发后台管理系统
2. 后期适配移动端和指令式弹框
## 源码
[github](https://github.com/lanmushan/slash-layer)
[gitee](https://gitee.com/lanmushan/slash-layer)

## 依赖
```json
{
  "core-js": "^3.6.5",
  "vue": "^3.0.0",
  "axios": "^0.26.0",
  "less-loader": "^7.3.0",
  "@typescript-eslint/eslint-plugin": "^5.10.1",
  "@typescript-eslint/parser": "^5.10.1",
  "@vue/cli-plugin-babel": "^4.5.15",
  "@vue/cli-plugin-typescript": "^4.5.15",
  "@vue/cli-service": "~4.5.0",
  "@vue/compiler-sfc": "^3.2.29",
  "@vue/eslint-config-typescript": "^10.0.0",
  "babel-eslint": "^10.1.0",
  "docsify-cli": "^4.4.3",
  "eslint": "^8.7.0",
  "eslint-plugin-vue": "^8.4.0",
  "less": "^4.1.2",
  "typescript": "~4.5.5"
}
```

## 开发指南

详细参考手册请参考 [暂时还没有](https://www.yuque.com/u134302/slash)

### 安装

```shell
npm install slash-layer
```
### 配置
配置文件（可参考详细配置这里只提供示例）
```javascript
export const config = {
    title: "自定义全局标题",
    max: false,
    min: false,
    loadingTime: 200,
    successDecide(msg) {
        console.log(msg);
        if (msg.code == 200) {
            return {
                msg: msg.msg, result: true, data: msg.data
            }
        } else {
            return {
                msg: msg.msg, result: false, data: msg.data
            }
        }
    }
}
export default config;
```
### main.js
```javascript
import {createApp} from 'vue'
import App from './App.vue'
import SlashLayer from '../src/index.ts';
import {config} from './LayerConfig'
let app = createApp(App);
app.config.globalProperties.$systemName = '用户管理系统'
app.use(SlashLayer,config)
app.mount('#app')

```
### 调用示例
```vue
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
</template>

<script>
import HelloWorld from "../components/HelloWorld"
import UserForm from "../components/UserForm"

export default {
  name: "GlobalConfigurationDemo",
  data(){
  return  {
    src: "../assets/1.jpg"
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
      });
    },
    updateForm() {
      this.$layer.updateForm({
        title: "更新用户",
        content: {
          component: UserForm,
          props: {
            msg: "更新用户"
          }
        }
      });
    },
    readForm() {
      this.$layer.readForm({
        title: "读取用户信息",
        content: {
          component: UserForm,
          props: {
            msg: "读取用户信息"
          }
        }
      });
    },
    images() {
      this.$layer.images({
         imgList:[
           {
             src:require("../assets/1.jpg")
           },
           {
             src:require("../assets/3.jpg")
           },
           {
             src:require("../assets/2.jpg")
           }
         ]
      });
    }
  }
}
</script>

<style scoped>

</style>
```
