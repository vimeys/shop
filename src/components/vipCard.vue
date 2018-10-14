/**
*   Created By  YS  on 2018/8/15
*   公共会员卡
*/
<template>
  <div class="card" :class="{'border':detail.hasBorder}" @click="chooseCard(index)">
    <img src="../assets/images/payCardBg.png" alt="" v-if="detail.MembershipType==1">
    <img src="../assets/images/fixCard.png" alt="" v-else-if="detail.MembershipType==2">
    <img src="../assets/images/onceCard.png" alt="" v-else="detail.MembershipType==3">
    <div class="content">
      <div class="name">
        {{detail.MembershipName}}({{detail.MembershipCardShopName}})
        <span class="sale-name" v-if="hasSold">已售：{{detail.Sold||0}}</span>
      </div>
      <div class="detail">
        <div>
          <div slot="reference" style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 10px" v-if="!hasSold">服务范围：{{detail.ServiceScope |replace}}</div>
          <el-popover
            v-else
            placement="top-start"
            width="250"
            trigger="hover"
            :content="detail.ServiceScope|replace">
            <!--<el-button slot="reference">hover 激活</el-button>-->
            <div slot="reference" style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 10px">服务范围：{{detail.ServiceScope |replace}}</div>
          </el-popover>

        </div>
        <div v-if="detail.MembershipType!=3">具体权益：{{detail.ServiceScope|replace}},享受{{10-detail.Discount}}折优惠</div>
      </div>
      <div class="money-date">
        <div v-if="detail.MembershipType==3">消费次数：{{detail.Frequency}}次</div>
        <div v-else>卡内额度：{{detail.BuyAmount}}</div>
        <div v-if="detail.EffectiveTime==-1">有效期：永久</div>
        <div v-else>有效期：{{detail.EffectiveTime/12}}年</div>
      </div>
    </div>
    <div class="coupon-radio"
         @click="choose(index)"
         v-show="detail.hasChecked">
      <div class="coupon-radio-point" v-show="detail.isChecked"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vipCard",
      props: {
        cardNum: {
          type: Number,
          default() {
            return 1//1是充值卡,2是定制卡,3是次卡
          }
        },
        hasSold:{
          type:Boolean,
          default(){
            return true
          }
        },
        hasChecked: {//是否有选框
          type: Boolean,
          default() {
            return true
          }
        },
        index:{//是否选中
          type:Number,
          default(){
            return 0
          }
        },
        hasBorder:{//是否有边框
          type:Boolean,
          default:false
        },
        detail:{
          type:Object,
          default(){
             return {
               BuyAmount:
                 null,
               CardType:
                 null,
               Content:
                 null,
               CreateDate:
                 "/Date(1535566017000)/",
               Discount:
                 12,
               EffectiveTime:
                 null,
               ExpireDate:
                 "/Date(1567102017000)/",
               Frequency:
                 0,
               IsEnable:
                 null,
               MembershipCardId:
                 5,
               MembershipName:
                 "定制卡",
               MembershipType:
                 1,
               Minimum:
                 null,
               ShopId:
                 270,
               Type:
                 null
             }
          }
        }
      },
      filters:{
        replace(val){
           return val.replace(/,/g,'，')
        }
      },
      data(){
          return {

          }
      },
      methods:{
        choose(index){
          console.log(index);
          this.detail.ischecked=!this.detail.ischecked;
          this.$emit('choose',[index,this.detail.ischecked])
        },
        // 点击选中卡片
        chooseCard(index){
            this.$emit('chooseCard',index)
        }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .card{
    width: 369px;
    height: 148px;
    position: relative;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-right: 30px;
    border: 2px solid rgba(0,0,0,0);
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
        position: relative;
        .sale-name{
          position: absolute;
          top:10px;
          right:18px;
          font-size: 13px;
        }
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
    .coupon-radio{
      width: 34px;
      height: 34px;
      position: absolute;
      top:-17px;
      right: -17px;
      border-radius: 50%;
      border: 2px solid #ffd73a;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      z-index: 50;
      .coupon-radio-point{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #ffd73a;
      }
    }
  }
  .border{
    border: 2px solid @bs-color !important;
    border-radius: 9px;
  }
  .card:nth-child(3n+0){
    margin-right: 0;
  }

</style>
