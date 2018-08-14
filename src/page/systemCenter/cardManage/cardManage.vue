/**
*   Created By  YS  on 2018/8/8
*   卡券管理
*/
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="优惠券" name="first">优惠券</el-tab-pane>
      <el-tab-pane label="会员卡" name="fourth">会员卡</el-tab-pane>
    </el-tabs>
    <div @click="push">123</div>
    <router-view></router-view>
  </div>

</template>

<script>
    // import  vipcard from '@/'
    export default {
        name: "cardManage",
      data(){
          return{
            show:false,
            activeName: 'first'
          }
      },
      methods:{
        handleClick(tab, event) {
          console.log(tab, event);
        },
        push(){
           this.$router.push({
             path:'/cardManage/priceCard'
           })
        }
      },
      // mounted(){
      //     this.$router.push({
      //       path:'/cardManage/vipCard'
      //     })
      //
      // }
    }
</script>

<style lang='less' scoped>

</style>
