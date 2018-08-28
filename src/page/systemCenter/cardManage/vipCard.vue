/**
*   Created By  YS  on 2018/8/8
*/
<template>
  <div class="box">
    <div class="active-header">
      <div :class="{'disabled':isDisabled}">
        <span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建会员卡
      </div>
      <div @click="addCard">删除会员卡</div>
      <div class="del">删除</div>
    </div>
    <div class="card-list">
      <ys-vip-card></ys-vip-card>
      <ys-vip-card></ys-vip-card>
      <ys-vip-card></ys-vip-card>
      <ys-vip-card></ys-vip-card>
      <ys-vip-card></ys-vip-card>
    </div>
    <ys-popup
      :width="pWidth"
      :height="pHeight"
      :showModal="showModal"
      @close="closePop"
      v-show="showModal"
    ></ys-popup>
  </div>
</template>

<script>
  import  ysVipCard from '@/components/vipCard';
  import  ysPopup from '@/components/popup'
    export default {
        name: "vipCard",
      components:{
          ysVipCard,
        ysPopup
      },
      data(){
          return{
            value: '',
            pWidth:800,
            pHeight:900,
            showModal:false,
            isDisabled:false
          }
      },
      methods:{
          // 添加卡片
        addCard(){
            this.showModal=true
        },
        // 关闭
        closePop(){
          console.log(123);
          this.showModal=false
        }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  @import "~@/assets/style/common";
    .box{
      min-width: 1200px;
      .active-header {
        display: flex;
        width: 1200px;
        height: 100px;
        justify-content: flex-start;
        align-items: center;
        div {
          width: 111px;
          height: 37px;
          background: #FFD736;
          font-size: 14px;
          line-height: 37px;
          text-align: center;
          margin-right: 30px;
        }
        .disabled {
          background: #E5E5E5;
        }
        .del {
          /*float: right;*/
          margin-left: 750px;
        }
      }
      .card-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
</style>
