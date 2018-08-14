/**
*   Created By  YS  on 2018/8/8
*/
<template>
        <div class="box">
            <el-container>
              <el-header>
                <div class="active-header">
                  <div class="disabled"><span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建活动</div>
                  <div @click="addCard">管理</div>
                  <div class="del">删除</div>
                </div>
              </el-header>
              <el-main >
                <div class="cards">
                  <ys-coupon></ys-coupon>
                  <ys-coupon></ys-coupon>
                  <ys-coupon></ys-coupon>
                  <ys-coupon></ys-coupon>
                  <ys-coupon></ys-coupon>
                  <ys-coupon></ys-coupon>
                </div>

              </el-main>
            </el-container>
          <ys-goods-card></ys-goods-card>
        </div>
</template>

<script>
  import ysCoupon from '@/components/coupon'
  import ysGoodsCard from "@/components/goodsCard"
    export default {
        name: "priceCard",
      components:{
          ysCoupon,
        ysGoodsCard
      },
      data(){
          return{

          }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .box{
    width: 1200px;
  }
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
  .cards{
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
  }
</style>
