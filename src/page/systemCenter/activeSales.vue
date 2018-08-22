/**
*   Created By  YS  on 2018/8/22
*/
<template>
      <div class="box-sale">
          <el-row :gutter="50" >
            <el-col :span="8"  class="">
              <div class="sale-card">
                <el-row>
                  <el-col :span="6">拆红包</el-col>
                  <el-col :span="4" :offset="14">
                    <el-switch
                      v-model="value2"
                      active-color="#FFD736"
                      inactive-color="#E5E5E5">
                    </el-switch>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    红包金额
                  </el-col>
                  <el-col :span="14">
                    <input type="text" class="base-input">
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="2"><div class="btn">确定</div></el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
      </div>
</template>

<script>
    export default {
        name: "activeSales",
      data(){
          return{
            value1: true,
            value2: true
          }
      }
    }
</script>

<style lang='less' scoped>
  @import '~@/assets/style/mixin';
  .box-sale{
    min-width: 1200px;
    .btn{
      .base-btn(327px)
    }
    .sale-card{
      background: #fff;
      /*padding: 20px 0;*/
    }
  }
</style>
