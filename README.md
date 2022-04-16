## 插件简介

基于VUE开发的模态框插件，支持常见的表单快速提交和图片预览等功能

## 效果

## 预览效果

![img](http://lmscms.oss-cn-beijing.aliyuncs.com/slash-layer/images/img.png)
![img](http://lmscms.oss-cn-beijing.aliyuncs.com/slash-layer/images/form.png)

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
##打开一个新增表单弹框
```ts
    Layer.createForm({
    title: "新增",
    content: {
        component: SysTbDictGroupUpdate, //内部的组件
        props: {
            //参数
        }
    }

} as FormConfigure).then(res => {
   // doSearchList();
})
```