/**
*   Created By  YS  on 2018/8/16
*/
<template>
      <div class="money-box">
        <div class="left"></div>
        <div class="right page">财务管理</div>
      </div>
</template>

<script>
    export default {
        name: "moneyManage"
    }
</script>

<style lang='less' scoped>

  .money-box{
    width: 100%;
    .left{
      min-width: 375px;
    }
    .right{
      min-width: 1200px;
    }
  .page{
    font-size: 30px;
    color: red;
  }
  }
</style>
