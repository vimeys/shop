/**
*   Created By  YS  on 2018/8/19
*/
<template>
  <div class="data-view-box">
    <ys-steps :navList="dataView"></ys-steps>
    <div>
      <router-view></router-view>
    </div>

  </div>

</template>

<script>
  import  ysSteps from '@/components/steps';
  import {dataView} from "../../assets/script/stepsData";

  export default {
    name: "dataView",
    components:{
      ysSteps
    },
    data(){
      return{
        dataView:dataView
      }
    }
  }
</script>

<style lang='less' scoped>
  .data-view-box{
    display: flex;
  }
</style>
