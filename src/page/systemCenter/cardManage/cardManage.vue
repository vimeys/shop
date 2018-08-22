/**
*   Created By  YS  on 2018/8/8
*   卡券管理
*/
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="优惠券" name="first">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="会员卡" name="second">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
    <!--<div @click="push">123</div>-->
    <!--<router-view></router-view>-->
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
          switch (this.activeName) {
            case 'first':
              this.$router.push({
                path: '/system/priceCard'
              });
              break;
            case 'second':
              this.$router.push({
                path: '/system/vipCard'
              });
              break;

          }
        },
      },
      // mounted(){
      //     this.$router.push({
      //       path:'/cardManage/vipCard'
      //     })
      //
      // }
      created(){

        this.$router.push({
          path:'/system/priceCard'
        })
      }
    }
</script>

<style lang='less' scoped>

</style>
