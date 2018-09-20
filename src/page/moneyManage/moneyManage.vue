/**
*   Created By  YS  on 2018/8/16
*/
<template>
      <div class="money-box">
        <!--<div class="left"></div>-->
        <!--<div class="right page">财务管理</div>-->
        <step :navList="moneyManage"></step>
        <router-view></router-view>
      </div>
</template>

<script>
  import step from '@/components/steps';
  import {moneyManage} from "../../assets/script/stepsData";

  export default {
    name: "moneyManage",
    components: {
      step
    },
    data() {
      return {
        moneyManage:moneyManage
      }
    }
  }
</script>

<style lang='less' scoped>

  .money-box{
    width: 100%;
    display: flex;
  }
</style>
