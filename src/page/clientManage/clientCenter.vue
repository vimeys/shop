/**
*   Created By  YS  on 2018/8/23
*/
<template>
      <div class="client-box">
        <steps :navList="clientManage"></steps>
        <div>
          <router-view></router-view>
        </div>
      </div>
</template>

<script>
  import  steps from '@/components/steps'
  import  {clientManage} from '../../assets/script/stepsData'
    export default {
        name: "clientCenter",
        components:{
          steps
        },
      data(){
          return {
            clientManage:clientManage
          }
      }
    }
</script>

<style lang='less' scoped>
  .client-box{
    display: flex;
    width: 100%;
  }
</style>
