/**
*   Created By  YS  on 2018/8/8
*/
<template>
        <div>
            <el-container>
              <el-header>
                <div class="active-header">
                  <div class="disabled"><span class="el-icon-circle-plus"></span>&nbsp;&nbsp;新建活动</div>
                  <div @click="addCard">管理</div>
                  <div class="del">删除</div>
                </div>
              </el-header>
              <el-main>

              </el-main>
            </el-container>
        </div>
</template>

<script>
  import ysCoupon from '@/components/coupon'
    export default {
        name: "priceCard",
      data(){
          return{

          }
      }
    }
</script>

<style lang='less' scoped>
  @import "~@/assets/style/mixin";
  .active-header{
    display: flex;
    width: 1200px;
    height: 100px;
    justify-content: flex-start;
    align-items: center;
    div{
      width: 111px;
      height: 37px;
      background: #FFD736;
      font-size: 14px;
      line-height: 37px;
      text-align: center;
      margin-right: 30px;
    }
    .disabled{
      background: #E5E5E5;
    }
    .del{
      /*float: right;*/
      margin-left: 750px;
    }
  }
</style>
