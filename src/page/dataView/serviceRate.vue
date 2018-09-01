/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div  class="rate-box">
          <el-tabs v-model="first" @tab-click="toggle" class="rate-table">
              <el-tab-pane label="服务" name="first">
                服务
                <div class="goods-list">
                  <ys-goods-card></ys-goods-card>
                  <ys-goods-card></ys-goods-card>
                  <ys-goods-card></ys-goods-card>
                  <ys-goods-card></ys-goods-card>
                  <ys-goods-card></ys-goods-card>
                  <ys-goods-card></ys-goods-card>
                </div>
              </el-tab-pane>
            <el-tab-pane label="店员" name="second">
                店员
            </el-tab-pane>
          </el-tabs>
      </div>
</template>

<script>
  import ysGoodsCard from '@/components/goodsCard'
    export default {
        name: "rate",
      components:{
          ysGoodsCard
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .rate-box{
    width: 100%;
  }
  .rate-table{
    width: 1200px;
  }
  .goods-list{
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
