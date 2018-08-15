/**
*   Created By  YS  on 2018/8/15
*会员卡
*/
<template>
  <div class="card">
    <img src="../assets/images/payCardBg.png" alt="" v-if="cardNum==1">
    <img src="../assets/images/fixCard.png" alt="" v-else-if="cardNum==2">
    <img src="../assets/images/onceCard.png" alt="" v-else="cardNum==3">
    <div class="content">
      <div class="name">
        充值卡
      </div>
      <div class="detail">
        <div>
          服务范围：美发类
        </div>
        <div>具体权益：美发类享受8折优惠</div>
      </div>
      <div class="money-date">
        <div v-if="cardNum==3">消费次数：20次</div>
        <div v-else>卡内额度：5000</div>
        <div>有效期：1年</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vipCard",
      props:{
          cardNum:{
            type:Number,
            default(){
               return 1//1是充值卡,2是定制卡,3是次卡
            }
          }
      },
      data(){

      }
    }
</script>

<style lang='less' scoped>

  .card{
    width: 369px;
    height: 144px;
    position: relative;
    img{
      position: absolute;
      top:0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    .content{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      display: flex;
      flex-direction: column;
      .name{
        font-size: 22px;
        color:#fff;
        padding-left: 30px;
        margin-top: 12px;text-align: left;
      }
      .detail{
        width: 100%;
        height: 65px;
        box-sizing: border-box;
        padding-left: 30px;
        margin-top: 8px;
        div{
          font-size: 13px;
          line-height: 18px;
          text-align: left;
        }
      }
      .money-date{
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding-left: 30px;
        padding-right: 30px;
        justify-content: space-between;
      }
    }

  }

</style>
