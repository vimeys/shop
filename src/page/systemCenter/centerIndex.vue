/**
*   Created By  YS  on 2018/8/23
*/
<template>
  <div class="center-box">
    <ys-steps :navList="client"></ys-steps>
    <div>
      <router-view/>
      dadfasdf
      <!--<index-page></index-page>-->
    </div>
  </div>

</template>

<script>
  import  ysSteps from  '@/components/steps'
  import {client} from '../../assets/script/stepsData'
  import  indexPage from './index/indexPage'
    export default {
        name: "centerIndex",
      components:{
        ysSteps,
        indexPage
      },
      data(){
        return {
          client:client
        }
      }
    }
</script>

<style lang='less' scoped>

  .center-box{
    width: 100%;
    display: flex;
  }
</style>
