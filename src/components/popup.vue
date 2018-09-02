
<!--/弹窗模板/-->

<template>
  <div class="popup" :style="{'z-index':zIndex}">
    <div class="popup-content" :style="{width:width+'px',height:height+'px'}">
            <span class="el-icon-close popup-close"
                  @click="close"
            ></span>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "popup",
    props: {
      showModal: {
        type: Boolean,
        default() {
          return false
        }
      },
      width:{
        type:Number,
        default(){
          return 1024
        }
      },
      height:{
        type:Number,
        default(){
          return 800
        }
      },
      zIndex:{
        type:Number,
        default(){
          return 100
        }
      }
    },
    data() {
      return {
        selfShow:this.showModal,
      }
    },
    methods: {

      close() {
        console.log('emit');
        this.$emit("close",false)
      },
    }
  }
</script>

<style  lang="less" scoped>
  @import "../assets/style/common";
  .popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    z-index: 100;
    .popup-content{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #F6F6F6;
      width: 1024px;
      height: 796px;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      .popup-close{
        position: absolute;
        top:40px;
        font-size: 18px;
        font-weight: bold;
        right: 30px;
        z-index: 1000;
      }
      .popup-close:hover{
          animation:rotate .4s linear;
      }
      /*.popup-close:*/
    }
  }
  @keyframes rotate {
     from {
       transform:rotate(0deg);
     }
    to{
      transform:rotate(270deg);
    }
  }
</style>
