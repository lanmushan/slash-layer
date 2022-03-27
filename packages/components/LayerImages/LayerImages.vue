<template>
  <div class="image-box">
    <div class="image-current-box" v-if="currentImg">
      <div class="image-preview-warp" @mousedown="onMouseDown" :style="{
        transform: `rotate(${rotateRef}deg) scale(${scaleRef})`
      }" ref="previewWarpRefDom">
        <img class="image-current" :src="currentImg.src">
      </div>
      <div class="image-preview-tool">

        <span @click="reductionPicture" class="icon iconfont">&#xe62f;</span>
        <!--       上一条 -->
        <span @click="previousPicture" class="icon iconfont">&#xe601;</span>
        <!--        下一条-->
        <span @click="nextPicture" class="icon iconfont">&#xe6b7;</span>
        <span @click="enlargePicture" class="icon iconfont">&#xec14;</span>
        <span @click="reducePicture" class="icon iconfont">&#xec13;</span>
        <span @click="clockWisePicture" class="icon iconfont">&#xe66a;</span>
        <span @click="antiClockwisePicture" class="icon iconfont">&#xe66b;</span>
      </div>
    </div>
    <div class="image-preview-box">
      <img @mouseenter="switchImg(it,index)" :class="it.current?'select':''" class="image-preview" :src="it.src"
           v-for="(it,index) in innerImgList">
    </div>
  </div>
</template>

<script lang="ts">
import {PictureType} from "./DeclareImages";

import {defineComponent, ref, PropType, reactive, onMounted, useTransitionState} from "vue";

export interface ImagePictureType extends PictureType {
  current: boolean,
  index: number
}

export default defineComponent({
  name: "Images",
  props: {
    imgList: {
      type: Array as PropType<PictureType[]>
    }
  },
  data() {
    return {
      moved: false,
      move: {
        startX: 0,
        startY: 0,
        elmStartX: 0,
        elmStartY: 0
      },
    }
  },
  methods: {
    onMouseDown(e) {
      e.preventDefault();

      const elm: HTMLElement = this.previewWarpRefDom;
      if (!elm) {
        return;
      }
      document.onmousemove = this.onMouseMove;
      document.onmouseup = this.onmouseup;
      this.move.startX = e.clientX;
      this.move.startY = e.clientY;
      this.move.elmStartX = elm?.offsetLeft;
      this.move.elmStartY = elm?.offsetTop;
      this.moved = true;
    },
    onMouseMove(e) {
      console.log("鼠标坐标:{}", e.clientX, e.clientY)
      const offsetX = e.clientX - this.move.startX
      const offsetY = e.clientY - this.move.startY
      if (this.moved) {
        const elm: HTMLElement | null = this.previewWarpRefDom
        if (elm) {
          let curTop = (offsetY + this.move.elmStartY);
          let curLeft = (offsetX + this.move.elmStartX)
          elm.style.top = curTop + "px";
          elm.style.left = curLeft + "px"
        }
      }
    },
    onmouseup() {
      console.log("取消移动")
      const elm: HTMLElement = this.previewWarpRefDom;
      this.moved = false;
      document.onmousemove = null;
    },

  },
  setup(props) {
    const innerImgList = reactive(props.imgList as Array<ImagePictureType>);
    const currentImg = ref<ImagePictureType | null>(null);
    const previewWarpRefDom = ref<any>(null);
    const scaleRef = ref<number>(1.0);
    const rotateRef = ref<number>(0);
    if (innerImgList.length > 0) {
      currentImg.value = innerImgList[0];
      innerImgList[0].current = true;
    }
    const resetCurrent = (index: number) => {
      if (currentImg.value && index != currentImg.value.index) {
        reductionPicture();
      }
      if (innerImgList.length > 0) {
        for (const img of innerImgList) {
          img.current = false;
        }
      }
      currentImg.value = innerImgList[index];
      currentImg.value.index = index;
      innerImgList[index].current = true;
    }
    const nextPicture = () => {
      if (currentImg.value) {
        const curIndex = currentImg.value.index;
        const index = (curIndex + 1) % innerImgList.length;
        resetCurrent(index);
      }

    }
    const doMouseWheelEvent = (e: WheelEvent) => {
      const dt = e["wheelDelta"] || e["detail"];
      console.log(dt)
      if (dt > 0) { //当滑轮向上滚动时
        enlargePicture();
      }
      if (dt < 0) { //当滑轮向下滚动时
        reducePicture();
      }
    }
    onMounted(() => {
      if (previewWarpRefDom.value) {
        let mouseWheel = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        previewWarpRefDom.value.addEventListener(mouseWheel, doMouseWheelEvent)
      } else {
        console.error("鼠标滚动事件监听失败");
      }
    })
    //顺时针
    const clockWisePicture = () => {
      rotateRef.value += 90;
    }
    //逆时针
    const antiClockwisePicture = () => {
      rotateRef.value -= 90;

    }
    //还原位置
    const reductionPicture = () => {
      rotateRef.value = 0;
      scaleRef.value = 1;
      if (previewWarpRefDom.value) {
        previewWarpRefDom.value.style.left = 0;
        previewWarpRefDom.value.style.top = 0;
      }

    }
    const previousPicture = () => {
      if (currentImg.value) {
        const curIndex = currentImg.value.index;
        const index = (curIndex - 1) >= 0 ? curIndex - 1 : innerImgList.length - 1;
        resetCurrent(index);
      }
    }
    const enlargePicture = () => {
      let temp: number = scaleRef.value + 0.1;
      temp = temp > 3 ? 3 : temp
      scaleRef.value = temp;
    }
    const reducePicture = () => {
      let temp: number = scaleRef.value - 0.1;
      temp = temp < 0.5 ? 0.5 : temp
      scaleRef.value = temp;

    }
    const switchImg = (cur, index) => {
      resetCurrent(index);
      cur.current = true;
      currentImg.value = cur as ImagePictureType;
      currentImg.value.index = index;
    }
    return {
      currentImg,
      switchImg,
      innerImgList,
      nextPicture,
      previousPicture,
      previewWarpRefDom,
      enlargePicture,
      scaleRef,
      rotateRef,
      reducePicture,
      antiClockwisePicture,
      clockWisePicture,
      reductionPicture
    }
  }
})
</script>

<style scoped lang="less">
.image-box {
  overflow: hidden;
  height: 100%;
}

.image-preview-box {
  position: absolute;
  bottom: 0px;
  text-align: center;
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.1);
  padding: 5px;
  overflow-y: hidden;
}

.image-current-box {
  height: calc(100% - 80px);
  display: block;
  vertical-align: middle;
  position: relative;
  overflow: hidden;

  .image-preview-warp {
    height: 100%;
    width: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    transition: transform 0.3s;
    cursor: pointer;

    .image-current {
      max-height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform-origin: 0px 0px
    }
  }

  .image-preview-tool {
    position: absolute;
    bottom: 0px;
    left: -300px;
    margin-left: 50%;
    height: 40px;
    width: 600px;
    box-sizing: border-box;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;

    .iconfont {
      margin-left: 10px;
      display: inline-block;
      width: 30px;
      color: #bcbaba;
      font-size: 20px;
      overflow: hidden;
      transition: all .1s;
      -webkit-transition: all .1s; /* Safari */
    }

    .iconfont:hover {
      cursor: pointer;
      font-size: 30px;
      color: white;
      transform: scale(1.5);
      -ms-transform: scale(1.1); /* IE 9 */
      -moz-transform: scale(1.1); /* Firefox */
      -webkit-transform: scale(1.1); /* Safari 和 Chrome */
      -o-transform: scale(1.1);
    }
  }

  .image-preview-warp:hover {
  }


}

.image-preview {
  height: 100%;
  margin-left: 5px;
  box-sizing: border-box;
  transition: all 0.1s
}

.image-preview.select {
  transform: scale(1.2);
}
</style>